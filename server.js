const express = require("express");
const app = express();

require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

//adding express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes

const MessageRoute = require("./routes/MessageRoute");

// init database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.log(error));

//endpoints
app.use("/", MessageRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
