const express = require("express");
const app = express();
const register = require("./Routes/Register");
const cors = require("cors");
require('dotenv').config()
const Login = require("./Routes/Login");
const FaceEntries = require("./Routes/FaceEntries");
const FoodEntries = require("./Routes/FoodEntries");
const ColorEntries = require("./Routes/ColorEntries");
const ApparelEntries = require("./Routes/ApparelEntries");
const GeneralEntries = require("./Routes/GeneralEntries");
const DeleteAccount = require("./Routes/DeleteAccount");
const connectDb = require("./Database/Connect");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/register", register);
app.use("/login", Login);
app.use("/image", FaceEntries);
app.use("/image", FoodEntries);
app.use("/image", ColorEntries);
app.use("/image", ApparelEntries);
app.use("/image", GeneralEntries);
app.use("/delete", DeleteAccount);

if (process.env.NODE_ENV === 'production') {
app.use(express.static('client/build'));
}

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log("db connection error", err);
  }
};

start();
