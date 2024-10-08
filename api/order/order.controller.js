import { logger } from '../../services/logger.service.js'
import { orderService } from './order.service.js'

export async function getOrders(req, res) {
	try {
		const filterBy = {
			host: req.query.host || '',
			guest: req.query.guest || '',
			stay: req.query.stay || ''
		}
		const orders = await orderService.query(filterBy)
		res.json(orders)
	} catch (err) {
		logger.error('Failed to get orders', err)
		res.status(400).send({ err: 'Failed to get orders' })
	}
}

export async function getOrderById(req, res) {
	try {
		const orderId = req.params.id
		const order = await orderService.getById(orderId)
		res.json(order)
	} catch (err) {
		logger.error('Failed to get order', err)
		res.status(400).send({ err: 'Failed to get order' })
	}
}

export async function addOrder(req, res) {
	const { body: order } = req

	try {
		const addedOrder = await orderService.add(order)
		res.json(addedOrder)
	} catch (err) {
		logger.error('Failed to add order', err)
		res.status(400).send({ err: 'Failed to add order' })
	}
}

export async function updateOrder(req, res) {
	const { body: order } = req
	try {
		const updatedOrder = await orderService.update(order)
		res.json(updatedOrder)
	} catch (err) {
		logger.error('Failed to update order', err)
		res.status(400).send({ err: 'Failed to update order' })
	}
}

export async function removeOrder(req, res) {
	try {
		const orderId = req.params.id
		const removedId = await orderService.remove(orderId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove order', err)
		res.status(400).send({ err: 'Failed to remove order' })
	}
}

export async function addOrderMsg(req, res) {
	const { loggedinUser } = req

	try {
		const orderId = req.params.id
		const msg = {
			txt: req.body.txt,
			by: loggedinUser,
		}
		const savedMsg = await orderService.addOrderMsg(orderId, msg)
		res.json(savedMsg)
	} catch (err) {
		logger.error('Failed to update order', err)
		res.status(400).send({ err: 'Failed to update order' })
	}
}

export async function removeOrderMsg(req, res) {
	try {
		const orderId = req.params.id
		const { msgId } = req.params

		const removedId = await orderService.removeOrderMsg(orderId, msgId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove order msg', err)
		res.status(400).send({ err: 'Failed to remove order msg' })
	}
}
