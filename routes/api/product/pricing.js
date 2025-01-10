const express = require('express');
const router = express.Router();
const {
  getPricings,
  getPricing,
  createPricing,
  updatePricing,
  deletePricing,
} = require('../../../controllers/product/pricingController');

router.route('/')
  .get(getPricings)
  .post(createPricing);

router.route('/:id')
  .get(getPricing)
  .put(updatePricing)
  .delete(deletePricing);

module.exports = router;
