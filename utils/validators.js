const { body } = require("express-validator/check");
const User = require("../models/user");

exports.registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Register Enter your email correctly")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Register This email is already exist");
        }
      } catch (e) {
        console.log(e);
      }
    }).normalizeEmail(),
  body("password", "Register Password should be min 6 sybols").isLength({
    min: 6,
    max: 56,
  }).isAlphanumeric().trim(),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Register Password should be similar");
    }
    return true;
  }).trim(),
  body("name").trim()
    .isLength({ min: 3 })
    .withMessage("Register Name should be min 3 symbols"),
];


exports.addSmartPhoneValidator =[
  body("title").isLength({min: 3}).withMessage("Minimum length for title should be 3 symbols"),
  body("price").isNumeric().withMessage("write correct price"),
  body("descr").isLength({min:10}).withMessage("Description should be min 10 symbols"),
]