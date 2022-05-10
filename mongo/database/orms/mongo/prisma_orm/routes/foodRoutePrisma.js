const express = require("express");
const app = express();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


app.get("/foods", async (request, response) => {
  try {
    const foods = await prisma.foods.findMany({
      include: {
        categories: true,
      },
    })
    response.send(foods);

  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/category", async (request, response) => {
    try {
      const food = await prisma.foods.findMany({include:{ categories: true }})
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
          // categories:{
          //   create:{
          //     Type:  "Solid",
          //     description: "This is a solid food",
          //   }
          // }
          }
       })
       return res.status(200).send({Details: user, message:"User created Successfully"});
      }
     catch (error) {
      response.status(500).send(error);
    }
  });
  app.post("/category", async (request, response) => {
    try {
      console.log(request.body);
      const category = await prisma.categories.create({
        data: {
          type:  request.body.type,
          description: request.body.description,
          foodId: request.body.foodId
          }
       })
       return response.status(200).send({Details: category, message:"Category created Successfully"});
    } catch (error) {
      console.log(error)
      response.status(500).send(error);
    }
  });

// app.patch("/food/:id", async (request, response) => {
//     try {
    
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

//   app.delete("/food/:id", async (request, response) => {
//     try {
      
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });
    

module.exports = app;
