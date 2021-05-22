const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRound = 10;

//Create schema of members here
const UserSchema = new Schema({
  nome_completo: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Informe o email"],
  },
  nome_usuario: {
    type: String,
    required: [true, "Informe o nome de usúario"],
  },
  senha: {
    type: String,
    required: [true, "Informe a senha"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now(),
  },
  lastLoggedOut: {
    type: Date,
    default: Date.now(),
  },
});

//Cryptography of password
UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("senha")) {
    const data = this;
    bcrypt.hash(this.senha, saltRound, function (err, senhaCriptografada) {
      if (err) {
        next(err);
      } else {
        data.senha = senhaCriptografada;
        next();
      }
    });
  } else {
    next();
  }
});
UserSchema.methods.encrypt = function (senha, callback) {
  const data = this;
  bcrypt.hash(senha, saltRound, function (err, senhaCriptografada) {
    if (err) {
      callback(err);
    } else {
      data.senha = senhaCriptografada;
      callback(err, senhaCriptografada);
    }
  });
};

//check hashed password
UserSchema.methods.isCorrectPassword = function (senha, callback) {
  bcrypt.compare(senha, this.senha, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
