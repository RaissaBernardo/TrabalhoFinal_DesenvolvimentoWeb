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
