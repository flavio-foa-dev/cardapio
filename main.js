
// cardapio.js
async function carregarJSON(url) {
  try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
  } catch (error) {
      console.error('Erro ao carregar o JSON:', error);
  }
}

/// main.js
document.addEventListener('DOMContentLoaded', function () {
  //var accordion = document.getElementById('accordion');

  // Carrega o JSON do arquivo e renderiza o cardápio
  carregarJSON('./data.json').then(cardapioData => {
      let contador = 1;
      for (let secao in cardapioData) {
        renderizarCardapio(contador, secao, cardapioData[secao]);
        contador += 1;
      }
  });
});

// renderizarCardapio.js
let card = document.querySelector('.container');

function renderizarCardapio(contador, sectionId, data) {
  card.innerHTML += `
  <div class="card">
        <div class="card-header" id="section${contador}">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${contador}" aria-expanded="true" aria-controls="collapse${contador}">
                ${sectionId} <i class="fas fa-chevron-down"></i>
                </button>
            </h2>
        </div>

        <div id="collapse${contador}" class="collapse ${contador === 1 ? 'show' : ''}" aria-labelledby="section${contador}" data-parent="#accordion">
            <div class="card-body">
            <div class="card-body">
                <!-- Adicione os pratos da seção de entradas aqui -->

                <div class="menu-item">
                ${handlePlates(data)}
                </div>

            </div>
        </div>
    </div>
  `;
}

function handlePlates(data) {
  return data.map((plate)=> `
    <div>
      <h4>${plate.prato}</h4>
      <p class="description">${plate.descricao}</p>
    </div>
    <div class="info">
      <p>Valor serve 1: R$ ${Number(plate.serve_1).toFixed(2)}</p>
      <p>Valor serve 2: R$ ${Number(plate.serve_2).toFixed(2)}</p>
    </div>
  `).join('');
}
