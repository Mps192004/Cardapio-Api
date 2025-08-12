const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome_comida: {
    type: String,
    required: true
  },
  bebidas: String,
  sobremesas: String
});

module.exports = mongoose.model('Contato', ContatoSchema);