const mongoose = require("mongoose");
const { update } = require("../models/user");

const Users = mongoose.model("users");

module.exports = {
  async index(req, res) {
    const data = await Users.find();
    return res.json(data);
  },
  async show(req, res) {
    const data = await Users.findById(req.params.id);
    return res.json(data);
  },
  async store(req, res) {
    const data = await Users.find({ email: req.body.email });

    if (data.length > 0) {
      return res.json({
        success: false,
        message: "Email",
      });
    } else {
      Users.create(req.body)
        .then(result => {
          return res.json({
            success: true,
            message: "User created",
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
  async update(req, res) {
    await Users.findById(req.params.id)
      .then(result => {
        req.body.senha = result.senha;

        Users.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
          .then(result => {
            return res.json({
              success: true,
              message: "User updated",
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
          message: "User not found",
          error: err,
        });
      });
  },
  async destroy(req, res) {
    await Users.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "User deleted",
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
  async changePassword(req, res) {
    await Users.findOne({ email: req.params.email })
      .then(result => {
        result.encrypt(req.body.senha, async function (err, same) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Error",
              Error: err,
            });
          } else if (!same) {
            return res.status(401).json({
              success: false,
              message: "User not found",
            });
          } else {
            req.body = result;
            await Users.findByIdAndUpdate(req.body._id, req.body, {
              new: true,
            })
              .then(result => {
                return res.json({
                  success: true,
                  message: "User updated",
                });
              })
              .catch(err => ({
                success: false,
                message: err,
              }));
          }
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: "Error occured",
          error: err,
        });
      });
  },
  async verifyEmail(req, res) {
    await Users.findOne({ email: req.params.email }, function (err, user) {
      if (err) {
        return res.json({
          success: false,
          message: "internal error",
          error: err,
        });
      } else if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "User found",
        });
      }
    });
  },
};

//Tutorial
/*
https://www.youtube.com/watch?v=2jqok-WgelI
*/
