const { Router } = require("express");
const router = Router();
const Auth = require("../middleware/auth");
const SmartPhone = require("../models/smartPhone");

function mapCart(cart) {
  return cart.items.map((c) => ({
    ...c.SmartPhoneId._doc,
    id:c.SmartPhoneId.id,
    count: c.count,
  }));
}


function computePrice(smartPhones) {
  return smartPhones.reduce((total, smartPhone) => {
    return (total += smartPhone.price * smartPhone.count);
  }, 0);
}

router.post("/add", Auth, async (req, res) => {
  const smartPhone = await SmartPhone.findById(req.body.id);
  await req.user.addToCart(smartPhone);
  res.redirect("/card");
});
router.post("/snart", Auth, async (req, res) => {
  const smartPhone = await SmartPhone.findById(req.body.id);
  await req.user.addToCart(smartPhone);
  res.redirect("/smart");
});

router.delete("/remove/:id", Auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.SmartPhoneId");
  const smartPhones = mapCart(user.cart);
  const cart = {
    smartPhones,
    price: computePrice(smartPhones)
  };

  res.status(200).json(cart);
});

router.get("/",Auth, async (req, res) => {
  const user = await req.user.populate("cart.items.SmartPhoneId");
  const smartPhones = mapCart(user.cart);
 
  res.render("card", {
    title: "Cart Phones",
    isCard: true,
    smartPhones: smartPhones,
    price: computePrice(smartPhones),

  });
});

module.exports = router;
