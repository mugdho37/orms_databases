const express = require("express");
const Category = require("../models/category");
const foodModel = require("../models/food");
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

app.get("/category", async (request, response) => {
    try {
      // const foods = await foodModel.find({});
      const category= await Category.find({}).populate("foods");
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
      await category.save();
      console.log(category);
      response.send(category);
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
  
      if (!food) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });
    

module.exports = app;
