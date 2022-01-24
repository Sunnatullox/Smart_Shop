const { Router } = require("express");
const Order = require("../models/order");
const Auth = require("../middleware/auth");
const router = Router();

router.get("/",Auth, async(req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate(
      "user.userId"
    );
    res.render("Orders", {
      isOrder: true,
      title: "Orders",
      orders: orders.map((c) => ({
          ...c._doc,
          price: c.smartPhones.reduce((total, c) => {
              return (total += c.count * c.smartPhone.price);
          },0),
      })),
    });
  } catch (e) {
    console.log(e);
  }
});
router.post("/",Auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.SmartPhoneId");
    const smartPhones = user.cart.items.map((c) => ({
      count: c.count,
      smartPhone: { ...c.SmartPhoneId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
        avatarUrl:req.user
      },
      smartPhones,
    });
    await order.save();
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
