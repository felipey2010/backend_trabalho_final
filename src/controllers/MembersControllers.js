const mongoose = require("mongoose");
const { update } = require("../models/member");

const Membros = mongoose.model("membros");

module.exports = {
  async index(req, res) {
    const dadoMembro = await Membros.find();
    return res.json(dadoMembro);
  },
  async show(req, res) {
    const dadoMembro = await Membros.findById(req.params.id);
    return res.json(dadoMembro);
  },
  async store(req, res) {
    await Membros.create(req.body)
      .then(result => {
        return res.json({
          success: true,
          message: "Member stored",
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err,
        });
      });
  },
  async update(req, res) {
    await Membros.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then(result => {
        return res.json({
          success: true,
          message: "Member updated",
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err,
        });
      });
  },
  async destroy(req, res) {
    await Membros.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "Member deleted",
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err,
        });
      });
  },
};
