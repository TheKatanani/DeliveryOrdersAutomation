const express = require('express')
const router = express.Router()
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/categoriesController')
router.route('/')
  .get(getCategories)
  .post(createCategory)
router.route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)
module.exports = router