
const bodyparser = require("body-parser");
const env = require("dotenv");
const express = require("express");
const mainRouter = require("./routes/route");
const db = require("./firebaseConfig");
env.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.use("/user", mainRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

