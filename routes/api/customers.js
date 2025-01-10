const express = require('express')
const router = express.Router()
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../../controllers/customerController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
router.route('/')
  .get(verifyRoles(ROLES_LIST.SELLER), getCustomers)
  .post(verifyRoles(ROLES_LIST.SELLER), createCustomer)
router.route('/:id')
  .get(verifyRoles(ROLES_LIST.SELLER), getCustomer)
  .put(verifyRoles(ROLES_LIST.SELLER), updateCustomer)
  .delete(verifyRoles(ROLES_LIST.SELLER), deleteCustomer)
module.exports = router