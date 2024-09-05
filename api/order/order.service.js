import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

const PAGE_SIZE = 3

export const orderService = {
	remove,
	query,
	getById,
	add,
	update,
	addOrderMsg,
	removeOrderMsg,
}

async function query(filterBy = { txt: '' }) {
	try {
        const criteria = _buildCriteria(filterBy)
        const sort = _buildSort(filterBy)

		const collection = await dbService.getCollection('order')
		var orderCursor = await collection.find(criteria, { sort })

		if (filterBy.pageIdx !== undefined) {
			orderCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
		}

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

		const collection = await dbService.getCollection('order')
		const order = await collection.findOne(criteria)
        
		order.createdAt = order._id.getTimestamp()
		return order
	} catch (err) {
		logger.error(`while finding order ${orderId}`, err)
		throw err
	}
}

async function remove(orderId) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    const { _id: ownerId, isAdmin } = loggedinUser

	try {
        const criteria = { 
            _id: ObjectId.createFromHexString(orderId), 
        }
        if(!isAdmin) criteria['owner._id'] = ownerId
        
		const collection = await dbService.getCollection('order')
		const res = await collection.deleteOne(criteria)

        if(res.deletedCount === 0) throw('Not your order')
		return orderId
	} catch (err) {
		logger.error(`cannot remove order ${orderId}`, err)
		throw err
	}
}

async function add(order) {
	try {
		const collection = await dbService.getCollection('order')
		await collection.insertOne(order)

		return order
	} catch (err) {
		logger.error('cannot insert order', err)
		throw err
	}
}

async function update(order) {
    const orderToSave = { vendor: order.vendor, speed: order.speed }

    try {
        const criteria = { _id: ObjectId.createFromHexString(order._id) }

		const collection = await dbService.getCollection('order')
		await collection.updateOne(criteria, { $set: orderToSave })

		return order
	} catch (err) {
		logger.error(`cannot update order ${order._id}`, err)
		throw err
	}
}

async function addOrderMsg(orderId, msg) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(orderId) }
        msg.id = makeId()
        
		const collection = await dbService.getCollection('order')
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

		const collection = await dbService.getCollection('order')
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId }}})
        
		return msgId
	} catch (err) {
		logger.error(`cannot add order msg ${orderId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
    const criteria = {
        vendor: { $regex: filterBy.txt, $options: 'i' },
        speed: { $gte: filterBy.minSpeed },
    }

    return criteria
}

function _buildSort(filterBy) {
    if(!filterBy.sortField) return {}
    return { [filterBy.sortField]: filterBy.sortDir }
}