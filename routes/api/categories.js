const express = require('express')
const router = express.Router()
const {
  getCategoriess,
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories
} = require('../../controllers/categoriesController') 
router.route('/')
  .get(getCategoriess)
  .post(createCategories) 
router.route('/:id')
  .get(getCategories)
  .put(updateCategories)
  .delete(deleteCategories)
module.exports = router