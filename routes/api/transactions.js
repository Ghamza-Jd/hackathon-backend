const express = require("express");
const router = express.Router();
const Transaction = require("../../models/Transaction");

/**
 * @route POST api/transactions
 * @desc Create a Transation
 * @access Private
 */
router.post("/", (req, res) => {
  const contentType = req.headers["content-type"];
  const Authorization = req.headers["authorization"];
  const Accept = req.headers["accept"];
  const {
    buyer,
    merchantId,
    amount,
    currency,
    cardnb,
    cardname,
    cardcvv,
    cardexmonth,
    cardexyear
  } = req.body;
  const options = {
    method: "POST",
    url: "https://api.areeba.com/transfer/hackathon/pay",
    headers: {
      "Content-Type": contentType,
      Authorization: Authorization,
      Accept: Accept
    },
    form: {
      merchantId: merchantId,
      apiPassword: "60f2e352f77cb65ae57d05c2191a27e9",
      amount: amount,
      currency: currency,
      card_number: cardnb,
      card_name: cardname,
      card_CVV: cardcvv,
      card_expiryMonth: cardexmonth,
      card_expiryYear: cardexyear
    }
  };
  request(options, (err, response) => {
    if (err) throw err;
    res.send(response.toJSON().body);
  });
  const buyerTrans = new Transaction({
    username: buyer,
    amount: amount,
    type: "pay"
  });
  buyerTrans.save();
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
