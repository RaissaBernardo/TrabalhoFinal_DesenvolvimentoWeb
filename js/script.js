function buscarNaPagina() {
  const termo = document.getElementById('campoBusca').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const textoCard = card.textContent.toLowerCase();
    card.style.display = textoCard.includes(termo) ? 'block' : 'none';
  });
}

//eventos js
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const botao = document.createElement('button');
    botao.className = 'btn-modal';
    botao.textContent = 'Mais informações';
    botao.onclick = () => abrirModal(botao);
    card.appendChild(botao);
  });
});

function criarCardEvento(evento) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${evento.imagem}" alt="${evento.titulo}">
    <h3>${evento.titulo}</h3>
    <p><strong>Data:</strong> ${evento.data}</p>
    <p><strong>Local:</strong> ${evento.local}</p>

    <div class="detalhes-completos" style="display: none;">
      <p class="hora">${evento.hora}</p>
      <p class="descricao">${evento.descricao}</p>
      <p class="categoria">${evento.categoria}</p>
    </div>
  `;

  // Botão "Mais informações"
  const botao = document.createElement('button');
  botao.className = 'btn-modal';
  botao.textContent = 'Mais informações';
  botao.onclick = () => abrirModal(botao);

  card.appendChild(botao);

  document.querySelector('.cards').appendChild(card);
}

function abrirModal(botao) {
  const card = botao.closest('.card');

  const titulo = card.querySelector('h3').textContent;
  const data = card.querySelector('p:nth-of-type(1)').textContent;
  const local = card.querySelector('p:nth-of-type(2)').textContent;

  const detalhes = card.querySelector('.detalhes-completos');
  const hora = detalhes.querySelector('.hora').textContent;
  const descricao = detalhes.querySelector('.descricao').textContent;
  const categoria = detalhes.querySelector('.categoria').textContent;

  document.getElementById('modalTitulo').textContent = titulo;
  document.getElementById('modalDataHora').textContent = `${data} | ${hora}`;
  document.getElementById('modalLocal').textContent = local;
  document.getElementById('modalDescricao').textContent = descricao;
  document.getElementById('modalCategoria').textContent = categoria;

  document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    fecharModal();
  }
};


//Parte do Index (Rafael)
// Ordena os eventos por data (mais próximos primeiro)
function ordenarPorData(a, b) {
  return new Date(a.data) - new Date(b.data);
}

// Função para renderizar os cards dos eventos
function renderizarEventos(listaEventos, classeCard) {
  const container = document.getElementById('eventos-destaque');
  if (!container) return; // Se não existir o container na página, não faz nada
  container.innerHTML = ""; // Limpa o conteúdo anterior

  listaEventos.forEach(evento => {
    const card = document.createElement('div');
    card.classList.add(classeCard);
    card.innerHTML = `
      <img src="${evento.imagem}" alt="${evento.titulo}">
      <h3>${evento.titulo}</h3>
      <p><strong>Data:</strong> ${evento.data}</p>
      <p><strong>Hora:</strong> ${evento.hora}</p>
      <p><strong>Localização:</strong> ${evento.local}</p>
      <p><strong>Descrição:</strong> ${evento.descricao}</p>
      <p><strong>Categoria:</strong> ${evento.categoria}</p>
    `;
    container.appendChild(card);
  });
}

// Detecta em qual página está
const pagina = window.location.pathname;

// Página Index (exibe os 3 próximos eventos)
if (pagina.includes('index.html') || pagina === '/' || pagina === '/index.html') {
  const hoje = new Date();
  const eventosFuturos = eventos.filter(e => new Date(e.data) >= hoje);
  const eventosOrdenados = eventosFuturos.sort(ordenarPorData);
  const eventosProximos = eventosOrdenados.slice(0, 3);
  renderizarEventos(eventosProximos, 'card');

// Página Eventos (exibe todos os eventos)
} else if (pagina.includes('eventos.html')) {
  const eventosOrdenados = eventos.sort(ordenarPorData);
  renderizarEventos(eventosOrdenados, 'card');
}