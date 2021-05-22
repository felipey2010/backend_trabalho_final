const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of members here
const UserSessionSchema = new Schema({
  nome: {
    type: String,
    required: [true, "Nome de usúario é obrigatório"],
  },
  token: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const UserSession = mongoose.model("userSessions", UserSessionSchema);

module.exports = UserSession;
