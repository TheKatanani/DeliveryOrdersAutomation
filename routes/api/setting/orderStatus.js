const express = require('express')
const router = express.Router()
const {
  createOrderStatus,
  deleteOrderStatus,
  getOrderStatus, 
  updateOrderStatus,
  getOrderStatuses
} = require('../../../controllers/setting/orderStatusController') 
router.route('/')
  .get(getOrderStatuses)
  .post(createOrderStatus) 
router.route('/:id')
  .get(getOrderStatus)
  .put(updateOrderStatus)
  .delete(deleteOrderStatus)
module.exports = router