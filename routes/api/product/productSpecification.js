const express = require('express');
const router = express.Router();
const {
  getProductSpecifications,
  getProductSpecification,
  createProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
} = require('../../../controllers/product/procutSpecificationController');

router.route('/')
  .get(getProductSpecifications)
  .post(createProductSpecification);

router.route('/:id')
  .get(getProductSpecification)
  .put(updateProductSpecification)
  .delete(deleteProductSpecification);

module.exports = router;
