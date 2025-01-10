const express = require('express')
const router = express.Router()
const {
  createRegion,
  deleteRegion,
  getRegion,
  getRegions,
  updateRegion
} = require('../../../controllers/setting/regionController') 
router.route('/')
  .get(getRegions)
  .post(createRegion) 
router.route('/:id')
  .get(getRegion)
  .put(updateRegion)
  .delete(deleteRegion)
module.exports = router