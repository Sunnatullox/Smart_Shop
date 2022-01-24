const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  lastname:String,
  city:String,
  state:String,
  zip:Number,
  Telnumber:Number,
  avatarUrl:String,
  bio:String,
  password:{
    type:String,
    required:true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        SmartPhoneId: {
          type: Schema.Types.ObjectId,
          ref: "SmartPhone",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const index = items.findIndex(
    (c) => c.SmartPhoneId.toString() === id.toString()
  );

  if (items[index].count === 1) {
    items = items.filter((c) => c.SmartPhoneId.toString() !== id.toString());
  } else {
    items[index].count--;
  }
  this.cart = { items };
  return this.save();
};

userSchema.methods.addToCart = function (smartPhone) {
  let items = [...this.cart.items];
  const index = items.findIndex((c) => {
    return c.SmartPhoneId.toString() === smartPhone._id.toString();
  });

  if (index >= 0) {
    items[index].count = items[index].count + 1;
  } else {
    items.push({
      SmartPhoneId: smartPhone._id,
      count: 1,
    });
  }

  ///--- bu qisqartirilgan varyant ---
  this.cart = { items };

  ////--- bunisi esa uzun varyanti
  // const newCart = {items:items};
  // this.cart = newCart;

  return this.save();
};

userSchema.methods.cleanCart = function () {
  this.cart = { items: [] };
  return this.save();
};
module.exports = model("User", userSchema);
