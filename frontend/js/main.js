const API_BASE_URL = 'https://crud-api-p93b.onrender.com/api';

const form = document.getElementById('form-contato');
const tabela = document.getElementById('tabela-contatos');

let idEditando = null; // Para controlar se está editando

// Carregar contatos
async function carregarContatos() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/cardapio`);
    const contatos = await resposta.json();

    tabela.innerHTML = '';

    contatos.forEach(contato => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${contato.nome_comida}</td>
        <td>${contato.bebidas || ''}</td>
        <td>${contato.sobremesas || ''}</td>
        <td>
          <button class="editar" onclick="editarContato('${contato._id}')">Editar</button>
          <button class="excluir" onclick="excluirContato('${contato._id}')">Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  } catch (error) {
    alert('Erro ao carregar Cardapio: ' + error.message);
  }
}

// Enviar formulário (criar ou atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome_comida = document.getElementById('nome').value.trim();
  const bebidas = document.getElementById('email').value.trim();
  const sobremesas = document.getElementById('telefone').value.trim();

  if (!nome_comida) {
    alert('O nome da comida é obrigatório');
    return;
  }

  const contato = { nome_comida, bebidas, sobremesas };

  try {
    let resposta;
    if (idEditando) {
      resposta = await fetch(`${API_BASE_URL}/cardapio/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
      });
    } else {
      resposta = await fetch(`${API_BASE_URL}/cardapio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
      });
    }

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem || 'Erro desconhecido');
    }

    alert(idEditando ? 'Cardapio atualizado!' : 'Cardapio criado!');
    idEditando = null;
    form.reset();
    carregarContatos();

  } catch (error) {
    alert('Erro ao salvar cardapio: ' + error.message);
  }
});

// Excluir contato
async function excluirContato(id) {
  if (!confirm('Deseja realmente excluir este cardapio?')) return;

  try {
    const resposta = await fetch(`${API_BASE_URL}/cardapio/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error('Falha ao excluir');

    alert('Cardapio excluído!');
    carregarContatos();
  } catch (error) {
    alert('Erro ao excluir cardapio: ' + error.message);
  }
}

// Editar contato
async function editarContato(id) {
  try {
    const resposta = await fetch(`${API_BASE_URL}/cardapio`);
    const contatos = await resposta.json();

    const contato = contatos.find(c => c._id === id);
    if (!contato) {
      alert('Cardapio não encontrado');
      return;
    }

    document.getElementById('nome').value = contato.nome_comida;
    document.getElementById('email').value = contato.bebidas;
    document.getElementById('telefone').value = contato.sobremesas;

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar cardapio para editar: ' + error.message);
  }
}
window.editarContato = editarContato;
window.excluirContato = excluirContato;
// Inicializar lista
carregarContatos();
