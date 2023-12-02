const mesas = {};

function abrirMesa() {
  const numeroMesa = Object.keys(mesas).length + 1;

  mesas[numeroMesa] = {
    pedidos: [],
    aberta: true,
  };

  atualizarListaMesas();

  // Adicionar imagem de mesa aberta
  const mesaAbertaDiv = document.createElement('div');
  mesaAbertaDiv.className = 'mesa-aberta';
  mesaAbertaDiv.innerHTML = `<p>Mesa ${numeroMesa} - Aberta</p><img src="mesa_aberta.png" alt="Mesa Aberta">`;

  document.body.appendChild(mesaAbertaDiv);

  // Mostrar botões relevantes
  document.getElementById('fecharMesa').style.display = 'block';
  document.getElementById('adicionarPedido').style.display = 'block';
  document.getElementById('preConta').style.display = 'block';

  alert(`Mesa ${numeroMesa} aberta!`);
}

function adicionarPedido() {
  const numeroMesa = parseInt(document.getElementById('numeroMesaPedido').value);
  const item = document.getElementById('itemPedido').value;
  const preco = parseFloat(document.getElementById('precoPedido').value);

  if (mesas[numeroMesa] && mesas[numeroMesa].aberta) {
    mesas[numeroMesa].pedidos.push({ item, preco });
    alert(`Pedido adicionado para Mesa ${numeroMesa}: ${item} - $${preco}`);
  } else {
    alert(`Mesa ${numeroMesa} não está aberta ou não existe.`);
  }
}

function visualizarPreConta() {
  const numeroMesa = parseInt(document.getElementById('numeroMesaPreConta').value);

  if (mesas[numeroMesa] && mesas[numeroMesa].aberta) {
    const preConta = mesas[numeroMesa].pedidos.map((pedido) => `${pedido.item} - $${pedido.preco}`);
    alert(`Itens na Pré-Conta da Mesa ${numeroMesa}:\n${preConta.join('\n')}`);
  } else {
    alert(`Mesa ${numeroMesa} não está aberta ou não existe.`);
  }
}

function fecharMesa() {
  const numeroMesa = parseInt(document.getElementById('numeroMesa').value);

  if (mesas[numeroMesa] && mesas[numeroMesa].aberta) {
    const total = calcularTotal(numeroMesa);

    mesas[numeroMesa].aberta = false;

    atualizarListaMesas();

    // Remover a imagem da mesa aberta
    const mesaAbertaDiv = document.querySelector('.mesa-aberta');
    mesaAbertaDiv.parentNode.removeChild(mesaAbertaDiv);

    // Esconder os botões após fechar a mesa
    document.getElementById('fecharMesa').style.display = 'none';
    document.getElementById('adicionarPedido').style.display = 'none';
    document.getElementById('preConta').style.display = 'none';

    alert(`Mesa ${numeroMesa} fechada. Total a pagar: $${total}`);
  } else {
    alert(`Mesa ${numeroMesa} não está aberta ou não existe.`);
  }
}

function calcularTotal(numeroMesa) {
  let total = 0;
  mesas[numeroMesa].pedidos.forEach((pedido) => {
    total += pedido.preco;
  });
  return total;
}

function atualizarListaMesas() {
  const listaMesasElement = document.getElementById('listaMesas');
  listaMesasElement.innerHTML = '';

  Object.keys(mesas).forEach((numeroMesa) => {
    const mesa = mesas[numeroMesa];
    const status = mesa.aberta ? 'Aberta' : 'Fechada';

    const listItem = document.createElement('li');
    listItem.className = `list-group-item ${mesa.aberta ? 'mesa-aberta' : 'mesa-fechada'}`;
    listItem.textContent = `Mesa ${numeroMesa} - Status: ${status}`;
    listaMesasElement.appendChild(listItem);
  });
}
