import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

const PAGE_SIZE = 3
const COLLECTION_NAME = 'order'

export const orderService = {
	remove,
	query,
	getById,
	add,
	update,
	addOrderMsg,
	removeOrderMsg,
}

async function query(filterBy = {}) {
	try {
		const { host, guest, stay } = filterBy
		let criteria = {}
		const collection = await dbService.getCollection(COLLECTION_NAME)
		if (host) {
			criteria['host._id'] = ObjectId.isValid(host) ? new ObjectId(host) : host;
		}
		if (guest) {
			criteria['guest._id'] = ObjectId.createFromHexString(guest)
		}
		if (stay) {
			criteria['stay._id'] = ObjectId.createFromHexString(stay)
		}
		var orderCursor = await collection.find(criteria).sort({ createdAt: -1 })
		const orders = orderCursor.toArray()
		return orders
	} catch (err) {
		logger.error('cannot find orders', err)
		throw err
	}
}

async function getById(orderId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(orderId) }
		const collection = await dbService.getCollection(COLLECTION_NAME)
		const order = await collection.findOne(criteria)
		return order
	} catch (err) {
		logger.error(`while finding order ${orderId}`, err)
		throw err
	}
}

async function remove(orderId) {
	try {
		const criteria = {
			_id: ObjectId.createFromHexString(orderId),
		}
		const collection = await dbService.getCollection(COLLECTION_NAME)
		const res = await collection.deleteOne(criteria)
		if (res.deletedCount === 0) throw ('Not your order')
		return orderId
	} catch (err) {
		logger.error(`cannot remove order ${orderId}`, err)
		throw err
	}
}

async function add(order) {
	try {
		const collection = await dbService.getCollection(COLLECTION_NAME)
		const orderToSave = correctData(order)
		await collection.insertOne(orderToSave)
		return orderToSave
	} catch (err) {
		logger.error('cannot insert order', err)
		throw err
	}
}

async function update(order) {
	try {
		const { _id } = order
		const orderToSave = correctData(order)
		const criteria = { _id: ObjectId.createFromHexString(_id) }
		delete orderToSave._id
		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.updateOne(criteria, { $set: orderToSave })
		orderToSave._id = _id
		return orderToSave
	} catch (err) {
		logger.error(`cannot update order ${order._id}`, err)
		throw err
	}
}

async function addOrderMsg(orderId, msg) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(orderId) }
		msg.id = makeId()

		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.updateOne(criteria, { $push: { msgs: msg } })

		return msg
	} catch (err) {
		logger.error(`cannot add order msg ${orderId}`, err)
		throw err
	}
}

async function removeOrderMsg(orderId, msgId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(orderId) }

		const collection = await dbService.getCollection(COLLECTION_NAME)
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId } } })

		return msgId
	} catch (err) {
		logger.error(`cannot add order msg ${orderId}`, err)
		throw err
	}
}

function correctData(order) {
	order.host._id = new ObjectId(order.host._id)
	order.guest._id = new ObjectId(order.guest._id)
	order.createdAt = new Date(order.createdAt)
	order.startDate = new Date(order.startDate)
	order.endDate = new Date(order.endDate)
	return order

}