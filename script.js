const cart = [];
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

function formatMoney(n) {
  return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function renderCart() {
  cartList.innerHTML = '';
  if (!cart.length) {
    cartList.innerHTML = '<p>Tu carrito está vacío.</p>';
    cartTotal.textContent = '$0';
    return;
  }
  let total = 0;
  cart.forEach((it, idx) => {
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.innerHTML = `${it.qty}x ${it.name} - ${formatMoney(it.price * it.qty)} <button data-i="${idx}" class="remove">x</button>`;
    cartList.appendChild(div);
  });
  cartTotal.textContent = formatMoney(total);
}

document.querySelectorAll('.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product');
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const found = cart.find(c => c.name === name);
    if (found) found.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
  });
});

cartList.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) {
    cart.splice(e.target.dataset.i, 1);
    renderCart();
  }
});

document.getElementById('checkout').addEventListener('click', () => {
  if (!cart.length) return alert('Carrito vacío');
  const msg = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const textarea = document.querySelector('#contact-form textarea');
  if (textarea) textarea.value = 'Pedido: ' + msg;
  location.hash = '#contacto';
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Pedido enviado. ¡Gracias!');
  e.target.reset();
  cart.length = 0;
  renderCart();
});

renderCart();
