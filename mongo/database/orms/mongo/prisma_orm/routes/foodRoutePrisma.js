const express = require("express");
const app = express();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


app.get("/foods", async (request, response) => {
  try {
    const foods = await prisma.foods.findMany({ include:{category: true}});
    response.send(foods);

  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});
app.get("/foods/:id", async (request, response) => {
  try {
    const foods = await prisma.foods.findUnique({
      where: { id: request.params.id },
      include: { category: true },
    });
    response.send(foods);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});
app.get("/category", async (request, response) => {
    try {
      const food = await prisma.categories.findMany({include:{ foods: true }})
      console.log(food)
      return response.status(200).send(food);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.post("/food", async (request, response) => {
    
    try {
      const _name = request.body.name
      const _calory = request.body.calories
      const food = await prisma.foods.create({
        data: {
          name: _name,
          calories: _calory,
          categoryId: request.body.categoryId
          }
       })
       return response.status(200).send({Details: food, message:"Food created Successfully"});
      }
     catch (error) {
       console.log(error)
      response.status(500).send(error);
    }
  });
  app.post("/category", async (request, response) => {
    try {
      const category = await prisma.categories.create({
        data: {
          type:  request.body.type,
          description: request.body.description,    
          }
       })
       return response.status(200).send({Details: category, message:"Category created Successfully"});
    } catch (error) {
      console.log(error)
      response.status(500).send(error);
    }
  });

app.patch("/food/:id", async (request, response) => {
  try {
    const food_id = request.params.id;
    // console.log(food_id);
    // mongoDB
    const user_info = await prisma.foods.update({
      where: {
        id: food_id,
      },
      data: {
        name: request.body.name,
        calories: request.body.calories,
      },
    })
    if (user_info) {
      return response.status(200).send({message: "User updated successfully", updatedUser: {user_info}});
    } else {
      return response.status(200).send("User not found");
    }
  } catch(error) {
    console.log(error)
    return response.status(500).send(error);
  }
  });

  app.delete("/food/:id", async (request, response) => {
    try {
      const deleteFood = await prisma.foods
        .delete({
          where: {
            id: request.params.id,
          },
        })
        .then((info) => {
          return response.status(200).send({ message: "User deleted Successfully" });
        });
      
    } catch (error) {
      response.status(500).send(error);
    }
  });
    

module.exports = app;
