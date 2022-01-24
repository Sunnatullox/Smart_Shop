const express = require("express");
const path = require("path");
const app = express();
const flash = require("connect-flash");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const homeRoutes = require("./routes/Home");
const SmartphoneRoutes = require("./routes/Smartphone");
const AddRoutes = require("./routes/Add");
const cardRoutes = require("./routes/Card");
const orderRoutes = require("./routes/order");
const authRouter = require("./routes/auth");
const profileRoutes = require("./routes/profil");
const varMiddleware = require("./middleware/var");
const userMiddleware = require("./middleware/user");
const error404 = require("./middleware/error");
const fileMiddleware = require("./middleware/file");
const BodyParser = require("body-parser");

const Urlmongoodb =
  "mongodb+srv://Sunnatullox:sunnatullox1996@cluster0.fzj2x.mongodb.net/SmartPhoneShop";

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
  collection: "session",
  uri: Urlmongoodb,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sunnatullox",
    resave: "false",
    saveUninitialized: false,
    store,
  })
);
app.use(
  fileMiddleware.fields([
    { name: "avatar", maxCount: 1 },
    { name: "img", maxCount: 1 },
    { name: "imgs", maxCount: 1 },
  ])
);
app.use(varMiddleware);
app.use(userMiddleware);
app.use(flash());

app.use("/", homeRoutes);
app.use("/smart", SmartphoneRoutes);
app.use("/add", AddRoutes);
app.use("/card", cardRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRouter);
app.use("/Profile", profileRoutes);

app.use(error404);

async function start() {
  try {
    await mongoose.connect(Urlmongoodb, { useNewUrlParser: true });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server has ben started on port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
