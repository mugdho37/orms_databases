import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Project } from "../../models/project";
import { associateUserProjects, User } from "../../models/user";
const prisma = new PrismaClient();
// const User = require('../../firebase-config/config')

associateUserProjects();

/*
This controller is for sequelize ORM. 
This ORM only working on mySql
*/
class mainController {
  async create(req: Request, res: Response) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //This part was built for testing firebase add operation

      //Firebase
      // const data = req.body;
      // await User.add({ data });
      // res.send({ msg: "User Added" });

      // return res.status(200).send({Details: user, message:"User created Successfully"});
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async retrieve(req: Request, res: Response) {
    try {
      const str_id = req.params.user_id;

      const user_info = await User.findByPk(str_id, {
        attributes: ["id", "name", "email"],
      });

      if (user_info) {
        return res.status(200).send(user_info);
      } else {
        return res.status(200).send("User not found");
      }
    } catch {
      return res.status(500).send("Internal Server Error");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const user_id = req.params.user_id;
      // const user_info = await User.findByPk(user_id, {
      //   attributes: ["id", "name", "email"],
      // });
      const user_info = await User.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        {
          where: {
            id: user_id,
          },
        }
      );

      if (user_info) {
        return res
          .status(200)
          .send({
            message: "User updated successfully",
            updatedUser: { user_info },
          });
      } else {
        return res.status(200).send("User not found");
      }
    } catch {
      return res.status(500).send("Internal Server Error");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const user_id = req.params.user_id;
      await User.findOne({ where: { id: user_id } }).then((data) => {
        User.destroy({ where: { id: user_id } });
        return res.status(200).send({ message: "User deleted Successfully" });
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
  async retrieveAll(req: Request, res: Response) {
    try {
      const user_info = await User.findAll().then((info) => {
        return res.status(200).send(info);
      });

      return res.status(200).send(user_info);
    } catch {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

export default new mainController();
