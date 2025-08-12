const express = require('express');
const router = express.Router();
const {
  criarContato,
  listarContatos,
  atualizarContato,
  deletarContato
} = require('../controllers/contatoController');

// Rota POST - Criar contato
router.post('/cardapio', criarContato);

// Rota GET - Listar todos os contatos
router.get('/cardapio', listarContatos);

// Rota PUT - Atualizar contato por ID
router.put('/cardapio/:id', atualizarContato);

// Rota DELETE - Excluir contato por ID
router.delete('/cardapio/:id', deletarContato);

module.exports = router;
