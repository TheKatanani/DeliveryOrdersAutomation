const express = require('express')
const router = express.Router()
const {
  createOrderType,
  deleteOrderType,
  getOrderType,
  getOrderTypes,
  updateOrderType
} = require('../../../controllers/setting/orderTypeController') 
router.route('/')
  .get(getOrderTypes)
  .post(createOrderType) 
router.route('/:id')
  .get(getOrderType)
  .put(updateOrderType)
  .delete(deleteOrderType)
module.exports = router