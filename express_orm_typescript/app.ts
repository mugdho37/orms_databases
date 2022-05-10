import { userproject } from './seeders/projectusers';
import { ProjectUsers } from './models/projectusers';
import { Project } from './models/project';
import { users } from './seeders/users';
import { projects } from './seeders/project';
import * as bodyparser from "body-parser";
import env from "dotenv";
import express from "express";
import mainRouter from "./main/routes/routes";
import db from "./models";
import { User } from "./models/user";
import mongoose from 'mongoose';
env.config();
const app = express();
const port = process.env.PORT || 3000;

// const createFunction = () => {
//   userproject.map(r => {
//     ProjectUsers.create(r)
//  })
// }
// createFunction();
// mongoose
//   .connect("mongodb://localhost/test_database")
//   .then(() => console.log("connection successful"))
//   .catch((err) => console.log(err));
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.use("/", mainRouter);
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
