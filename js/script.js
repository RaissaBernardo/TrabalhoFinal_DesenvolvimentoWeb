function buscarNaPagina() {
  const termo = document.getElementById('campoBusca').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const textoCard = card.textContent.toLowerCase();
    card.style.display = textoCard.includes(termo) ? 'block' : 'none';
  });
}

  