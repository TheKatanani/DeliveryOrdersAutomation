const express = require('express')
const router = express.Router()
const {
  createPaymentType,
  deletePaymentType,
  getPaymentType,
  getPaymentTypes,
  updatePaymentType
} = require('../../../controllers/setting/paymentTypesController')
const ROLES_LIST = require('../../../config/roles_list')
const verifyRoles = require('../../../middleware/verifyRoles')
router.route('/')
  .get(getPaymentTypes)
  .post(verifyRoles(ROLES_LIST.ADMIN), createPaymentType)
router.route('/:id')
  .get(verifyRoles(ROLES_LIST.ADMIN), getPaymentType)
  .put(verifyRoles(ROLES_LIST.ADMIN), updatePaymentType)
  .delete(verifyRoles(ROLES_LIST.ADMIN), deletePaymentType)
module.exports = router