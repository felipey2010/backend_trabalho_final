const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of categories here
const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Name of category is required"],
  },
});

const Categories = mongoose.model("categories", CategorySchema);

module.exports = Categories;
