const mongoose = require("mongoose");
const { update } = require("../models/blog");

const Blogs = mongoose.model("blogs");

module.exports = {
  //show all created articles
  async index(req, res) {
    const data = await Blogs.find();
    return res.json(data);
  },
  //show a particular article
  async show(req, res) {
    const data = await Blogs.findById(req.params.id);
    return res.json(data);
  },
  //Create and store an article
  async store(req, res) {
    Blogs.create(req.body).then(result => {
      return res
        .json({
          success: true,
          message: "Article created",
        })
        .catch(err => {
          return res.json({
            success: false,
            message: err,
          });
        });
    });
  },
  //Update existing blog
  async update(req, res) {
    await Blogs.findById(req.params.id).then(result => {
      Blogs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .then(result => {
          return res.json({
            success: true,
            message: "Article updated",
          });
        })
        .catch(err => ({
          success: false,
          message: err,
        }));
    });
  },
  //Delete category
  async destroy(req, res) {
    await Blogs.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "Article deleted",
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
