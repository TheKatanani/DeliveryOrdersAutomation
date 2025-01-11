const express = require("express");
const {
  getSoldItems,
  getSoldItemById,
  createSoldItem,
  updateSoldItem,
  deleteSoldItem,
} = require("../../controllers/soldItemController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

const router = express.Router();

// Routes
router.get("/", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), getSoldItems);
router.get("/:id", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), getSoldItemById);
router.post("/", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), createSoldItem);
router.patch("/:id", verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.SELLER), updateSoldItem);
router.delete("/:id", verifyRoles(ROLES_LIST.ADMIN), deleteSoldItem);

module.exports = router;