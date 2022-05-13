const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
