const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");

/**
 * @route POST api/transactions
 * @desc Create a Transation
 * @access Private
 */
router.post("/", (req, res) => {
  const { buyer, price } = req.body;
  const buyerTrans = new Transaction({
    username: buyer,
    amount: price,
    type: "pay"
  });
  const sellerTrans = new Transaction({
    username: seller,
    amount: price,
    type: "receive"
  });
  buyerTrans.save();
  sellerTrans.save();
  res.status(200).json({ msg: "Transaction completed!" });
});

/**
 * @route POST api/transactions/history
 * @desc Retrieve history of a specific user
 * @access Private
 */
router.post("/history", (req, res) => {
  const { username } = req.body;
  Transaction.find({ username: username })
    .sort({ time: -1 })
    .then(hist => res.json(hist));
});

module.exports = router;
