const { Router } = require("express");
const Smartphone = require("../models/smartPhone");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const smartPhone = await Smartphone.find()
    res.render("index", {
      title: "Smart Shop",
      isHome: true,
      smartPhone
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
