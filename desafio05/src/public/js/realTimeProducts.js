const socket = io();

const id = document.getElementById('id'),
  title = document.getElementById('title'),
  description = document.getElementById('description'),
  code = document.getElementById('code'),
  price = document.getElementById('price'),
  stock = document.getElementById('stock'),
  category = document.getElementById('category'),
  agregar = document.getElementById('agregar'),
  modificar = document.getElementById('modificar'),
  eliminar = document.getElementById('eliminar'),
  div = document.getElementById('products');

socket.emit('message', 'Conexion abierta');

socket.on('products', data => {
  div.innerHTML = '';
  let html = '';
  data.forEach(el => {
    html += `<li class="firstLi">id: ${el.id}</li>
    title: ${el.title} <br>
    description: ${el.description} <br>
    code: ${el.code} <br>
    price: ${el.price} <br>
    status: ${el.status} <br>
    stock: ${el.stock} <br>
    category: ${el.category} <br>
    thumbnail: ${el.thumbnail}<br>`;
  })
  div.innerHTML = html;
})

agregar.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('agregar', {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    status: true,
    stock: stock.value,
    category: category.value,
    thumbnail: []
  })
});

socket.on('responseAgr', data => {
  div.innerHTML = '';
  let html = '';
  data.forEach(el => {
    html += `<li class="firstLi">id: ${el.id}</li>
    title: ${el.title} <br>
    description: ${el.description} <br>
    code: ${el.code} <br>
    price: ${el.price} <br>
    status: ${el.status} <br>
    stock: ${el.stock} <br>
    category: ${el.category} <br>
    thumbnail: ${el.thumbnail}<br>`;
  })
  div.innerHTML = html;
});

modificar.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('modificar', {
    id: id.value,
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    status: true,
    stock: stock.value,
    category: category.value,
    thumbnail: []
  })
});

socket.on('responseMod', data => {
  div.innerHTML = '';
  let html = '';
  data.forEach(el => {
    html += `<li class="firstLi">id: ${el.id}</li>
    title: ${el.title} <br>
    description: ${el.description} <br>
    code: ${el.code} <br>
    price: ${el.price} <br>
    status: ${el.status} <br>
    stock: ${el.stock} <br>
    category: ${el.category} <br>
    thumbnail: ${el.thumbnail}<br>`;
  })
  div.innerHTML = html;
});

eliminar.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('eliminar', {
    id: id.value
  })
});

socket.on('responseEli', data => {
  div.innerHTML = '';
  let html = '';
  data.forEach(el => {
    html += `<li class="firstLi">id: ${el.id}</li>
    title: ${el.title} <br>
    description: ${el.description} <br>
    code: ${el.code} <br>
    price: ${el.price} <br>
    status: ${el.status} <br>
    stock: ${el.stock} <br>
    category: ${el.category} <br>
    thumbnail: ${el.thumbnail}<br>`;
  })
  div.innerHTML = html;
});