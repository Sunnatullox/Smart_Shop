const { Router } = require("express");
const Smartphone = require("../models/smartPhone");
const Auth = require("../middleware/auth");
const router = Router();



function mapCart(cart) {
  return cart.items.map((c) => ({
    ...c.SmartPhoneId._doc,
    id:c.SmartPhoneId.id,
    count: c.count,
  }));
}


function computePrice(user) {
  return user.reduce((count, user) => {
    return (count += user.count);
  }, 0);
}

router.get("/", async (req, res) => {
  try{
    const smartPhone = await Smartphone.find()
    .populate("userId", "email name")
    .select("price title img descr ");
    const user = await req.user.populate("cart.items.SmartPhoneId");
      const smartPhones = mapCart(user.cart);
    res.render("Smartphones", {
      title: "Smartphones",
      isPhone: true,
      userId:req.user ? req.user._id.toString(): null,
      smartPhone,
      count:computePrice(smartPhones)
    });
  }catch(e){
    console.log(e);
  }
});

router.get("/:id/edit", Auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try{
    const smartPhone = await Smartphone.findById(req.params.id);
    if(smartPhone.userId.toString() !== req.user._id.toString()){
      return res.redirect()
    }
    res.render("smatrPhone-edit", {
      title: `Edit ${smartPhone.title}`,
      smartPhone,
    });

  }catch(e){
    console.log(e);
  }
});

router.post("/edit", Auth, async (req, res) => {
  await Smartphone.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/smart");
});

router.post("/remove", Auth, async (req, res) => {
  try {
    await Smartphone.deleteOne({ _id: req.body.id });
    res.redirect("/smart");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", Auth, async (req, res) => {
  const smartPhone = await Smartphone.findById(req.params.id);
  const SmartPhones = await Smartphone.find();
  res.render("smartPhone", {
    layout: "detail",
    title: `Smartphone ${smartPhone.title}`,
    smartPhone,
    SmartPhones,
  });
});

module.exports = router;
