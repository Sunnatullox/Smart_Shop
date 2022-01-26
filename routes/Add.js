const { Router } = require("express");
const { validationResult} = require("express-validator/check");
const SmartPhone = require("../models/smartPhone");
const Auth = require("../middleware/auth");
const router = Router();
const { addSmartPhoneValidator } = require("../utils/validators");


router.get("/", Auth,(req, res) => {
  res.render("Add", { title: "Add Phone", isAdd: true });
});
router.post("/",  Auth, addSmartPhoneValidator , async (req, res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).render("Add", 
      { title: "Add Phone", isAdd: true, error: errors.array()[0].msg, data:{
        title:req.body.title,
        price:req.body.price,
        descr:req.body.descr,
        img:req.files.imgs[0].path,
      } });
    }
  }catch(e){
    console.log(e);
  }
  const smartphone = new SmartPhone({
    title: req.body.title,
    price: req.body.price,
    descr: req.body.descr,
    userId: req.user._id,
    img:req.files.imgs[0].path
  });
  try{
    await smartphone.save();
    res.redirect("/smart");
  }catch(e){
    console.log(e);
  }
});

module.exports = router;

