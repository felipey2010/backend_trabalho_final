const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema of members here
const MembroSchema = new Schema({
  nome_completo: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  sexo: {
    type: String,
    required: [true, "Informe o sexo"],
  },
  endereco: {
    type: String,
    required: [true, "Endereço é obrigatório"],
  },
  bairro: {
    type: String,
    required: [true, "Bairro é obrigatório"],
  },
  cidade: {
    type: String,
    required: [true, "Cidade é obrigatório"],
  },
  estado: {
    type: String,
    required: [true, "Estado é obrigatório"],
  },
  cep: {
    type: String,
    required: [true, "CEP é obrigatório"],
  },
  estado_civil: {
    type: String,
    required: [true, "Estado civil é obrigatório"],
  },
  estado_civil_outro: {
    type: String,
  },
  nome_do_conjuge: {
    type: String,
  },
  nome_dos_filhos: {
    type: String,
  },
  data_de_nascimento: {
    type: String,
    required: [true, "Data de nascimento é obrigatório"],
  },
  RG: {
    type: String,
  },
  CPF: {
    type: String,
    required: [true, "CPF é obrigatório"],
  },
  escolaridade: {
    type: String,
  },
  natural: {
    type: String,
    required: [true, "Natural é obrigatório"],
  },
  doador_de_sangue: {
    type: String,
    required: [true, "Campo obrigatório"],
  },
  tipo_sanguineo: {
    type: String,
    required: [true, "Informe o tipo de sangue"],
  },
  nome_pai: {
    type: String,
  },
  nome_mae: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Informe o email"],
  },
  profissao: {
    type: String,
  },
  participa_PGM: {
    type: String,
    required: [true, "Informe se participa de um PGM"],
  },
  nome_PGM: {
    type: String,
  },
  participa_ministerio: {
    type: String,
    required: [true, "Informe se participa de um ministério"],
  },
  nome_ministerio: {
    type: String,
  },
  data_de_entrada_ministerio: {
    type: String,
  },
  batizado: {
    type: String,
    required: [true, "Informe se é batizado"],
  },
  data_de_batismo: {
    type: String,
  },
  data_de_entrada_membresia: {
    type: String,
  },
  telefone: {
    type: String,
  },
  celular: {
    type: String,
    required: [true, "Informe o número de telefone"],
  },
  membro_ativo: {
    type: Boolean,
    default: false,
  },
  rede_social: {
    type: String,
  },
});

//membros should be replaced with the name of the table in the database
const Membros = mongoose.model("membros", MembroSchema);

module.exports = Membros;
