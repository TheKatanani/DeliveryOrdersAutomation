const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../../controllers/orderController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();

// Routes
router.get("/", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER, ROLES_LIST.DELIVERY_COORDINTOR), getOrders); // Accessible by multiple roles
router.get("/:id", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER, ROLES_LIST.DELIVERY_COORDINTOR), getOrderById);
router.post("/", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), createOrder);
router.patch("/:id", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), updateOrder);
router.delete("/:id", verifyRoles(ROLES_LIST.ADMIN, deleteOrder));

module.exports = router;