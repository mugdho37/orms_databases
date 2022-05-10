const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
