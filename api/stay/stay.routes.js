import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { getStays, getStayById, addStay, updateStay, removeStay, addStayMsg, removeStayMsg } from './stay.controller.js'

const router = express.Router()



router.get('/', log, getStays)
router.get('/:id', log, getStayById)
router.post('/', log, addStay)
router.put('/', updateStay)
router.delete('/:id', removeStay)
//Require auth for add, update, delete

router.post('/:id/msg', addStayMsg)
router.delete('/:id/msg/:msgId', removeStayMsg)

export const stayRoutes = router