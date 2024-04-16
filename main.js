
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

                <div class="menu-item">
                ${handlePlates(data, sectionId)}
                </div>

            </div>
        </div>
    </div>
  `;
}

function handlePlates(data, sectionId) {
  return data.map((plate)=> `
    <div class="">
      <h4>${plate.prato}</h4>
      <img src=${plate.main_img} alt=${plate.prato}>
      <p class="description">${plate.descricao}</p>
    </div>
    <div class="info">
    ${
      sectionId === "Bebidas" || sectionId === "Vinhos" || sectionId === "Cervejas" || sectionId === "Drinks" || sectionId === "Bebidas Alcoolicas"
        ? `<p> ${plate.serve_1 > 0 ? `Valor: R$ ${Number(plate.serve_1).toFixed(2)}` : ""}</p>
           <p>${plate.serve_2 > 0 ? `Valor: R$ ${Number(plate.serve_2).toFixed(2)}` : ""}</p>`
        : sectionId === "Pizzas" || sectionId === "Pizzas doces"
          ? `<p> ${plate.serve_1 > 0 ? `Valor Pequena: R$ ${Number(plate.serve_1).toFixed(2)}` : ""}</p>
             <p>${plate.serve_2 > 0 ? `Valor Grande: R$ ${Number(plate.serve_2).toFixed(2)}` : ""}</p>`
          : `<p> ${plate.serve_1 > 0 ? `Valor para 1: R$ ${Number(plate.serve_1).toFixed(2)}` : ""}</p>
             <p>${plate.serve_2 > 0 ? `Valor para 2: R$ ${Number(plate.serve_2).toFixed(2)}` : ""}</p>`
    }
      <hr>
      </div>
  `).join('');
}


async function scrollToSection(sectionId, id) {
  // Fecha todos os acordeões
  $('.collapse').collapse('hide');

  // Encontre o acordeão correspondente e o abra
  const acordeonElement = document.getElementById(sectionId);

  console.log(acordeonElement)
  if (acordeonElement) {
      $(acordeonElement).collapse('show');
  }

  // Verifique se a seção existe
  const sectionElement =  document.getElementById(id);

  if (sectionElement) {
      // Use o método scrollIntoView para rolar até a seção
      sectionElement.scrollIntoView({block: 'start', inline: 'end' });
      const sectionStart =  sectionElement.offsetTop;
        window.scrollBy(0, -sectionStart - 0 );

  }
}
