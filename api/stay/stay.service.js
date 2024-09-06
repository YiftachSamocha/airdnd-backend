import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'
import { createUserData } from '../../services/data/user.data.js'
import { createStayData } from '../../services/data/stay.data.js'
import { createOrderData } from '../../services/data/order.data.js'

const PAGE_SIZE = 3
const COLLECTION_NAME = 'stay'

export const stayService = {
	remove,
	query,
	getById,
	add,
	update,
	addStayMsg,
	removeStayMsg,
}

async function query(filterBy = {}) {
	_createData()

	try {
		const collection = await dbService.getCollection('stay')
		let { city, country, startDate, endDate } = filterBy

		let filter = {}

		// WHERE (Filter by city and country)
		if (city && country) {
			filter['location.city'] = city;
			if (country !== 'Im flexible') {
				filter['location.country'] = country;
			}
		}

		// WHEN (Filter by start and end date)
		if (startDate && endDate) {
			startDate = new Date(startDate);
			endDate = new Date(endDate);
			filter = { ...filter, ... _filterWhen({ startDate, endDate }) }
		}

		

		let stays = await collection.find(filter).toArray()
		return stays;
	} catch (err) {
		logger.error('cannot find stays', err)
		throw err
	}
}

async function getById(stayId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(stayId) }

		const collection = await dbService.getCollection('stay')
		const stay = await collection.findOne(criteria)

		stay.createdAt = stay._id.getTimestamp()
		return stay
	} catch (err) {
		logger.error(`while finding stay ${stayId}`, err)
		throw err
	}
}

async function remove(stayId) {
	const { loggedinUser } = asyncLocalStorage.getStore()
	const { _id: ownerId, isAdmin } = loggedinUser

	try {
		const criteria = {
			_id: ObjectId.createFromHexString(stayId),
		}
		if (!isAdmin) criteria['owner._id'] = ownerId

		const collection = await dbService.getCollection('stay')
		const res = await collection.deleteOne(criteria)

		if (res.deletedCount === 0) throw ('Not your stay')
		return stayId
	} catch (err) {
		logger.error(`cannot remove stay ${stayId}`, err)
		throw err
	}
}

async function add(stay) {
	try {
		const collection = await dbService.getCollection('stay')
		await collection.insertOne(stay)

		return stay
	} catch (err) {
		logger.error('cannot insert stay', err)
		throw err
	}
}

async function update(stay) {
	const stayToSave = { vendor: stay.vendor, speed: stay.speed }

	try {
		const criteria = { _id: ObjectId.createFromHexString(stay._id) }

		const collection = await dbService.getCollection('stay')
		await collection.updateOne(criteria, { $set: stayToSave })

		return stay
	} catch (err) {
		logger.error(`cannot update stay ${stay._id}`, err)
		throw err
	}
}

async function addStayMsg(stayId, msg) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(stayId) }
		msg.id = makeId()

		const collection = await dbService.getCollection('stay')
		await collection.updateOne(criteria, { $push: { msgs: msg } })

		return msg
	} catch (err) {
		logger.error(`cannot add stay msg ${stayId}`, err)
		throw err
	}
}

async function removeStayMsg(stayId, msgId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(stayId) }

		const collection = await dbService.getCollection('stay')
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId } } })

		return msgId
	} catch (err) {
		logger.error(`cannot add stay msg ${stayId}`, err)
		throw err
	}
}

async function _createData() {
	const stayCollection = await dbService.getCollection('stay')
	const userCollection = await dbService.getCollection('user')
	const orderCollection = await dbService.getCollection('order')

	const stayColCount = await stayCollection.countDocuments()
	const userColCount = await userCollection.countDocuments()
	const orderColCount = await orderCollection.countDocuments()


	if (stayColCount == 0 ||
		userColCount === 0 ||
		orderColCount === 0) {
		await stayCollection.deleteMany()
		await userCollection.deleteMany()
		await orderCollection.deleteMany()

		const newUsers = createUserData()
		await userCollection.insertMany(newUsers)

		const newStays = createStayData(newUsers)
		await stayCollection.insertMany(newStays)

		const newOrders = createOrderData(newStays, newUsers)
		await orderCollection.insertMany(newOrders)
	}
}

function _filterWhen(vacationRange) {
	const { startDate, endDate } = vacationRange

	return {
		reservedDates: {
			$not: {
				$elemMatch: {
					$or: [
						{
							startDate: { $lt: startDate },
							endDate: { $gt: startDate, $lt: endDate }
						},
						{
							startDate: { $gte: startDate, $lt: endDate },
							endDate: { $gt: endDate }
						},
						{
							startDate: { $lte: startDate },
							endDate: { $gte: endDate }
						},
						{
							startDate: { $gte: startDate, $lt: endDate },
							endDate: { $lte: endDate }
						}
					]
				}
			}
		}
	}
}
function _filterWho(sleep, who) {
	const amount = who.adults + who.children + who.infants
	if (amount === 0) return true
	if (sleep.maxCapacity < amount) return false
	const minimumCapacity = sleep.rooms.length
	if (minimumCapacity > amount) return false
	return true

}

function _filterExtra(stay, extra) {
	const { type, price, rooms, amenities, booking, standout } = extra
	const filterAmenities = amenities.filter(amenity => amenity.isSelected)
	if (!filterAmenities.every(amenity =>
		stay.amenities.some(stayAmenity => stayAmenity.name === amenity.name))) return false
	if (type !== 'any' && type !== stay.type) return false
	if (price[0] + price[1] !== 0) {
		if (stay.price.night < price[0] || stay.price.night > price[1]) return false
	}
	if ((rooms.bedrooms + rooms.rooms + rooms.bathrooms) !== 0) {
		if (stay.sleep.bedrooms < rooms.bedrooms || stay.sleep.bathrooms < rooms.bathrooms || stay.sleep.rooms.length < rooms.rooms) return false
	}
	if (booking.instant && !stay.highlights.some(highlight => highlight.main === 'Great check-in experience')) return false
	if (booking.self && !stay.highlights.some(highlight => highlight.main === 'Self check-in')) return false
	if (booking.pets && !stay.highlights.some(highlight => highlight.main === 'Pet-friendly')) return false
	if (standout.favorite && !stay.highlights.some(highlight => highlight.main === 'Great value')) return false
	if (standout.luxe && !stay.labels.some(label => label.label === 'luxe')) return false
	return true
}