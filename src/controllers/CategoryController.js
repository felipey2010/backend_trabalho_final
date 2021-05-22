const mongoose = require("mongoose");
const { update } = require("../models/category");

const Categories = mongoose.model("categories");

module.exports = {
  //show all categories
  async index(req, res) {
    const data = await Categories.find();
    return res.json(data);
  },
  //show a particular category
  async show(req, res) {
    const data = await Categories.findById(req.params.id);
    return res.json(data);
  },
  //Create and store a category
  async store(req, res) {
    const data = await Categories.find({ title: req.body.title });

    if (data.length > 0) {
      return res.json({
        success: false,
        message: "Category already exist",
      });
    } else {
      Categories.create(req.body)
        .then(result => {
          return res.json({
            success: true,
            message: "Category created",
          });
        })
        .catch(err => {
          return res.json({
            success: false,
            message: err,
          });
        });
    }
  },
  //Update existing category
  async update(req, res) {
    await Categories.findById(req.params.id)
      .then(result => {
        Categories.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
          .then(result => {
            return res.json({
              success: true,
              message: "Category updated",
            });
          })
          .catch(err => ({
            success: false,
            message: err,
          }));
      })
      .catch(err => {
        return res.json({
          success: false,
          message: "Category not found",
          error: err,
        });
      });
  },
  //Delete category
  async destroy(req, res) {
    await Categories.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "Category deleted",
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({
          success: false,
          message: err,
        });
      });
  },
};
