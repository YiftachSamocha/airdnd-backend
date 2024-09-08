import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
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
	await _createData()

	try {
		const collection = await dbService.getCollection(COLLECTION_NAME)
		let { city, country, startDate, endDate, adults, children, infants,
			label, type, price, rooms, amenities, booking, standout
		} = filterBy

		let filter = {}

		// WHERE (Filter by city and country)
		if (city && country) {
			filter['location.city'] = city
			if (country !== 'Im flexible') {
				filter['location.country'] = country
			}
		}

		// WHEN (Filter by start and end date)
		if (startDate && endDate) {
			startDate = new Date(startDate);
			endDate = new Date(endDate);
			filter = { ...filter, ..._filterWhen({ startDate, endDate }) }
		}
		//WHERE
		if (adults || children || infants) {
			const whoFilter = _filterWho({ adults, children, infants })
			filter = { ...filter, ...whoFilter }
		}
		//LABEL
		if (label && label !== 'icons') {
			filter = {
				...filter, labels: { $elemMatch: { label } }
			}
		}

		//EXTRA
		if (type || price || rooms || amenities || booking || standout) {
			filter = { ...filter, ..._filterExtra({ type, price, rooms, amenities, booking, standout }) }
		}

		let stays = await collection.find(filter).toArray()
		return stays
	} catch (err) {
		logger.error('cannot find stays', err)
		throw err
	}
}

async function getById(stayId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(stayId) }
		const collection = await dbService.getCollection(COLLECTION_NAME)
		const stay = await collection.findOne(criteria)
		return stay
	} catch (err) {
		logger.error(`while finding stay ${stayId}`, err)
		throw err
	}
}

async function remove(stayId) {
	try {
		const criteria = {
			_id: ObjectId.createFromHexString(stayId),
		}
		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.deleteOne(criteria)
		return stayId
	} catch (err) {
		logger.error(`cannot remove stay ${stayId}`, err)
		throw err
	}
}

async function add(stay) {
	try {
		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.insertOne(stay)
		return stay
	} catch (err) {
		logger.error('cannot insert stay', err)
		throw err
	}
}

async function update(stay) {
	try {
		const { _id } = stay
		const criteria = { _id: ObjectId.createFromHexString(_id) }
		delete stay._id
		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.updateOne(criteria, { $set: stay })
		stay._id = _id
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

		const collection = await dbService.getCollection(COLLECTION_NAME)
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

		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId } } })

		return msgId
	} catch (err) {
		logger.error(`cannot add stay msg ${stayId}`, err)
		throw err
	}
}

async function _createData() {
	const stayCollection = await dbService.getCollection(COLLECTION_NAME)
	const userCollection = await dbService.getCollection('user')
	const orderCollection = await dbService.getCollection('order')

	const stayColCount = await stayCollection.countDocuments()
	const userColCount = await userCollection.countDocuments()
	const orderColCount = await orderCollection.countDocuments()

	if (stayColCount === 0 ||
		userColCount === 0 ||
		orderColCount === 0) {

		await userCollection.deleteMany({})
		await stayCollection.deleteMany({})
		await orderCollection.deleteMany({})
		const newUsers = createUserData()
		const newStays = createStayData(newUsers)
		const newOrders = createOrderData(newStays, newUsers)

		if (newUsers.length && newStays.length && newOrders.length) {
			await stayCollection.insertMany(newStays)
			await userCollection.insertMany(newUsers)
			await orderCollection.insertMany(newOrders)
		}

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
function _filterWho({ adults = 0, children = 0, infants = 0 }) {
	const amount = Number(adults) + Number(children) + Number(infants)
	if (amount === 0) return {}
	const filter = {
		'sleep.maxCapacity': { $gte: amount },
		$expr: { $lte: [{ $size: "$sleep.rooms" }, amount] }
	}
	return filter
}

function _filterExtra({ type, price, rooms, amenities, booking, standout }) {
	price = price.length ? [Number(price[0]), Number(price[1])] : []
	rooms = { rooms: Number(rooms.rooms), bathrooms: Number(rooms.bathrooms), bedrooms: Number(rooms.bedrooms) }
	let filter = {}

	if (amenities.length) {
		console.log(amenities)
		amenities = Array.isArray(amenities) ? amenities : [amenities]
		console.log(amenities)
		filter['amenities.name'] = { $all: amenities }
	}
	if (type && type !== 'any') {
		filter['type'] = type
	}
	if (price.length && (price[0] + price[1] !== 0)) {
		console.log(price)
		filter['price.night'] = { $gte: price[0], $lte: price[1] }
	}
	if (rooms.bedrooms) {
		filter['sleep.bedrooms'] = { $gte: rooms.bedrooms };
	}
	if (rooms.bathrooms) {
		filter['sleep.bathrooms'] = { $gte: rooms.bathrooms };
	}
	if (rooms.rooms) {
		filter['$expr'] = { $gte: [{ $size: '$sleep.rooms' }, rooms.rooms] };
	}
	let bookingConditions = []
	if (booking.instant) {
		bookingConditions.push({ 'highlights.main': 'Great check-in experience' })
	}
	if (booking.self) {
		bookingConditions.push({ 'highlights.main': 'Self check-in' })
	}
	if (booking.pets) {
		bookingConditions.push({ 'highlights.main': 'Pet-friendly' })
	}
	if (bookingConditions.length) {
		filter['$and'] = bookingConditions
	}
	let standoutConditions = []
	if (standout.favorite) {
		standoutConditions.push({ 'highlights.main': 'Great value' })
	}
	if (standout.luxe) {
		standoutConditions.push({ 'highlights.main': 'Luxury stay' })
	}
	if (standoutConditions.length) {
		filter['$and'] = [...(filter['$and'] || []), ...standoutConditions]
	}

	return filter
}