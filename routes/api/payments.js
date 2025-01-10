const express = require('express')
const router = express.Router()
const {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  confirmPayment
  // deletePayment
} = require('../../controllers/paymentController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
router.route('/')
  .get(verifyRoles(ROLES_LIST.ACCOUNTANT), getPayments)
  .post(verifyRoles(ROLES_LIST.ACCOUNTANT, ROLES_LIST.DRIVER, ROLES_LIST.DELIVERY_COORDINTOR), createPayment)
router.route('/:id')
  .get(verifyRoles(ROLES_LIST.ACCOUNTANT, ROLES_LIST.DRIVER, ROLES_LIST.DELIVERY_COORDINTOR), getPayment)
  .put(verifyRoles(ROLES_LIST.ACCOUNTANT, ROLES_LIST.DRIVER), updatePayment)
router.route('/confirm/:id')
  .post(verifyRoles(ROLES_LIST.ACCOUNTANT), confirmPayment)
module.exports = router