const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of members here
const MemberSessionSchema = new Schema({
  nome_completo: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "Informe o email"],
  },
  CPF: {
    type: String,
    required: [true, "Informe o CPF"],
  },
  nome_usuario: {
    type: String,
    required: [true, "Informe o nome de usúario"],
  },
  senha: {
    type: String,
    required: [true, "Informe a senha"],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

//membros should be replaced with the name of the table in the database
const MemberSession = mongoose.model("memberSessions", MemberSessionSchema);

module.exports = MemberSession;
