const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./database/orms/mongo/mongoose/routes/foodRoutes.js");
const foodRouterPrisma = require("./database/orms/mongo/prisma_orm/routes/foodRoutePrisma.js");


const app = express();

app.use(express.json());

// mongoose.connect(
//   "mongodb+srv://test_database:12345@cluster0.hnrn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// );
mongoose.connect('mongodb://localhost:27017/myFirstDatabase')
    .then(() => {
        console.log('successfully connected to database');
    }).catch(err => console.log(err));

app.use(foodRouter);
// app.use(foodRouterPrisma)

app.listen(3000, () => {
  console.log("Server is running...");
});
