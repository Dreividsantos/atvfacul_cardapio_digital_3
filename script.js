// Alternar Modo Noturno
document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Lógica de Carrinho e Pedido
let carrinho = [];

function atualizarCarrinho() {
    const carrinhoBody = document.getElementById('carrinhoBody');
    carrinhoBody.innerHTML = '';
    let totalPedido = 0;

    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        totalPedido += itemTotal;

        carrinhoBody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td><input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${item.id}, this.value)"></td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>R$ ${itemTotal.toFixed(2)}</td>
                <td><button onclick="removerItem(${item.id})">Remover</button></td>
            </tr>
        `;
    });

    document.getElementById('totalPedido').textContent = totalPedido.toFixed(2);
}

function adicionarAoCarrinho(id, nome, preco) {
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function atualizarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id);
    item.quantidade = parseInt(quantidade);
    atualizarCarrinho();
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Pedido finalizado! Preencha seus dados para concluir a compra.");
    document.querySelector('.finalizacao').scrollIntoView();
}

function confirmarPedido() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const pagamento = document.getElementById('pagamento').value;

    if (nome === '' || endereco === '' || pagamento === '') {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const numeroPedido = Math.floor(Math.random() * 1000000);
    alert(`Obrigado, ${nome}! Seu pedido foi processado com sucesso. O número do seu pedido é ${numeroPedido}.`);
    carrinho = [];
    atualizarCarrinho();
    document.getElementById('nome').value = '';
    document.getElementById('endereco').value = '';
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const id = this.id;
        const nome = this.getAttribute('data-name');
        const preco = parseFloat(this.getAttribute('data-price'));

        if (this.checked) {
            adicionarAoCarrinho(id, nome, preco);
        } else {
            removerItem(id);
        }
    });
});
