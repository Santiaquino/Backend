const logout = document.getElementById('logout');

const sentProduct = async (id) => {
  fetch(`http://localhost:8080/api/carts/63e42a77a7db3ce1616786a7/products/${id}`, {
    method: 'POST',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
    .then(json => console.log(json));

  Swal.fire({
    toast: true,
    text: 'Producto agregado',
    position: 'top-right',
    showConfirmButton: false,
    timer: 2500
  })
};

logout.addEventListener('click', event => {
  event.preventDefault();
  fetch('/api/sessions/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
});