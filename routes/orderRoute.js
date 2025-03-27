const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const {
  addOrder,
  getOrder,
  getOrders,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/").post(isVerifiedUser, addOrder);
router.route("/").get(isVerifiedUser, getOrder);
router.route("/").get(isVerifiedUser, getOrders);
router.route("/").put(isVerifiedUser, updateOrder);

module.exports = router;
