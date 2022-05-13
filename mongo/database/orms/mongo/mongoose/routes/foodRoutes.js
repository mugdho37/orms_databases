const express = require("express");
const Category = require("../models/category");
const foodModel = require("../models/food");
const User = require("../models/user");
const app = express();

app.get("/foods", async (request, response) => {
  try {
    // const foods = await foodModel.find({});
    const foods= await foodModel.find({}).populate('category').exec();
    // await foods.populate('category').execPopulate()
    response.send(foods);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/foods/:id", async (request, response) => {
  try {
    // const foods = await foodModel.find({});
    console.log(request.params.id)
    const food= await foodModel.findOne({_id:request.params.id}).populate('category').exec();
    // await foods.populate('category').execPopulate()
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/category", async (request, response) => {
    try {
      // const foods = await foodModel.find({});
      const category= await Category.find({}).select({foodId: false}).populate('users').populate('foods').exec();
      // await foods.populate('category').execPopulate()
      response.send(category);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  app.get("/user", async (request, response) => {
    try {
      // const foods = await foodModel.find({});
      const category= await User.find({}).populate("categories");
      // await foods.populate('category').execPopulate()
      response.send(category);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.post("/food", async (request, response) => {
    
    try {
      // console.log(request);
      const food = new foodModel(request.body);
      await food.save();
      await Category.updateOne({
        _id: request.body.category
      },{
        $push:{
          foods: food._id
        }
      })
    //   await food.populate("category").exec();
      console.log(food);
      response.send(food);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  app.post("/category", async (request, response) => {
    const category = new Category(request.body);
    try {
      console.log(category)
      // await category.save();
      // await User.updateOne({
      //   _id: request.body.users
      // },{
      //   $push:{
      //     categories: category._id
      //   }
      // })
      // console.log(category);
      // response.send(category);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.post("/user", async (request, response) => {
    const user = new User(request.body);
    try {
      // await user.save();
      // await Category.updateOne({
      //   _id: request.body.category
      // },{
      //   $push:{
      //     users: user._id
      //   }
      // })
      console.log(user);
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  });
app.patch("/food/:id", async (request, response) => {
    try {
     const food =  await foodModel.findOneAndUpdate(request.params.id, request.body, {
      new: true
    });

      response.send(food);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.delete("/food/:id", async (request, response) => {
    try {
      const food = await foodModel.findByIdAndDelete(request.params.id);
  
      if (!food) {
        response.status(404).send({message: "No item found"});
      } else {
        response
          .status(200)
          .send({
            message: "Food Item deleted successfuly",
            DeletedItem: food,
          });
      }
      
    } catch (error) {
      response.status(500).send(error);
    }
  });
    

module.exports = app;
