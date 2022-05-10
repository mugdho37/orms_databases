import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Project } from "../../models/project";
import { associateUserProjects, User } from "../../models/user";
const prisma = new PrismaClient();
// const User = require('../../firebase-config/config')

// import { associateProjectUser } from "../../models/project";
associateUserProjects();
// associateProjectUser();
class mainController {
  async create(req: Request, res: Response) {
    try {
      // const user = await User.create({
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: req.body.password,
      // });

      const _name = req.body.name
      const _email = req.body.email
      const _password = req.body.password
      // const user = await prisma.users.create({
      //   data: {
      //     name: _name,
      //     email: _email,
      //     password: _password,
      //   },
      // });

      // const user = await prisma.user.create({
      //   data: {
      //     name: _name,
      //     email: _email,
      //     password: _password,
      //     project:{
      //       create:{
      //         title: "Title 1",
      //         description: "This is a mongoDb project",
      //         status: "In progress"
      //       }
      //     }
      //   }
      // })
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
      const user_id = parseInt(req.params.user_id);
      // const str_id = req.params.user_id;

      // const user_info = await User.findByPk(str_id, {
      //   attributes: ["id", "name", "email"],
      // });
      // const user_info = await prisma.users.findUnique({
      //   where: {
      //     id: user_id,
      //   },
      // });
      // const user_info = await prisma.users.findUnique({
      //   where: {
      //     id: str_id,
      //   },
      // })
      // console.log(user_info)
     
      // if (user_info) {
      //   return res.status(200).send(user_info);
      // } else {
      //   return res.status(200).send("User not found");
      // }
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
      // await User.update(
      //   {
      //     name: req.body.name,
      //     email: req.body.email,
      //     password: req.body.password,
      //   },
      //   {
      //     where: {
      //       id: user_id,
      //     },
      //   }
      // );
      // const user_info = await prisma.users.update({
      //   where: {
      //     id: Number(user_id),
      //   },
      //   data: {
      //     name: req.body.name,
      //     email: req.body.email,
      //     password: req.body.password,
      //   },
      // });
      // const user_info = await prisma.user.update({
      //   where: {
      //     id: user_id,
      //   },
      //   data: {
      //     name: req.body.name,
      //     email: req.body.email,
      //     password: req.body.password,
      //   },
      // })
      // if (user_info) {
      //   return res.status(200).send({message: "User updated successfully", updatedUser: {user_info}});
      // } else {
      //   return res.status(200).send("User not found");
      // }
    } catch {
      return res.status(500).send("Internal Server Error");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const user_id = req.params.user_id;
      await User.findOne({where:{id: user_id}}).then((data) => {
        User.destroy({ where: { id: user_id } });
        return res.status(200).send({message: "User deleted Successfully"});
      });
      // const deleteUser = await prisma.users
      //   .delete({
      //     where: {
      //       id: Number(user_id),
      //     },
      //   })
      //   .then((info) => {
      //     return res.status(200).send({ message: "User deleted Successfully" });
      //   });
      // const deleteUser = await prisma.user
      //   .delete({
      //     where: {
      //       id: user_id,
      //     },
      //   })
      //   .then((info) => {
      //     return res.status(200).send({ message: "User deleted Successfully" });
      //   });

    } catch(err) {
      return res.status(500).send( {message: err});
    }
  }
  async retrieveAll(req: Request, res: Response) {
    try {
      // await User.findAll().then((info) => {
      //   return res.status(200).send(info);
      // });
      // const users = await prisma.users.findMany({
      //   include: includeOption,
      // }).then((info) => {
      //     return res.status(200).send(info);
      //   });
      // await prisma.users
      //   .findMany({
      //     include: { projectusers: true },
      //   })
      //   .then((info) => {
      //     return res.status(200).send(info);
      //   });
      // const user_info = await prisma.user.findMany({include:{ project: true }})
      // console.log(user_info)
      // return res.status(200).send(user_info);
    } catch {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

export default new mainController();
