class Hamburguesa {
  constructor (nombre="", descripcion="", precio=0, boton="", imagen="") {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.boton = boton;
      this.imagen = imagen;
  }
}

class Extras {
  constructor (nombre="", descripcion="", precio=0,) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
  }
}

class Carrito {
  constructor() {
      this.items = new Map();
      this.cargarDeLocalStorage();
  }

  agregarItem(item) {
      const cantidad = this.items.get(item.nombre) || 0;
      this.items.set(item.nombre, cantidad + 1);
      this.guardarEnLocalStorage();
  }

  quitarItem(item) {
      const cantidad = this.items.get(item.nombre) || 0;
      if (cantidad > 0) {
          this.items.set(item.nombre, cantidad - 1);
          if (this.items.get(item.nombre) === 0) {
              this.items.delete(item.nombre);
          }
          this.guardarEnLocalStorage();
      }
  }

  obtenerCantidad(item) {
      return this.items.get(item.nombre) || 0;
  }

  calcularTotal() {
      let total = 0;
      for (let [nombre, cantidad] of this.items) {
          const item = [...menuHamburguesa, ...menuExtras].find(i => i.nombre === nombre);
          if (item) {
              total += item.precio * cantidad;
          }
      }
      localStorage.setItem("carritoTotal", total.toString())
      return total;
  }

  guardarEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(Array.from(this.items.entries())));
  }

  cargarDeLocalStorage() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
          this.items = new Map(JSON.parse(carritoGuardado));
      }
  }

  vaciarCarrito() {
      this.items.clear();
      this.guardarEnLocalStorage();
      actualizarTotalCarrito();
  }
}

let menuHamburguesa = [];
let menuExtras = [];

async function cargarProductos() {
  try {
      const response = await fetch('js/productos.json');
      const data = await response.json();
      
      menuHamburguesa = data.hamburguesas.map(h => new Hamburguesa(h.nombre, h.descripcion, h.precio, h.boton, h.imagen));
      menuExtras = data.extras.map(e => new Extras(e.nombre, e.descripcion, e.precio));
      
      crearMenuHamburguesas();
      crearMenuExtras();
      crearTotalCarrito();
  } catch (error) {
      console.error('Error al cargar los productos:', error);
  }
}

const carrito = new Carrito();

function actualizarBotonesCarrito(element, item) {
  const cantidad = carrito.obtenerCantidad(item);
  const botonesCarrito = element.querySelector('.botones-carrito');

  if (botonesCarrito) {
      const cantidadSpan = botonesCarrito.querySelector('.cantidad');
      cantidadSpan.textContent = cantidad;
  }
  actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
  const totalElement = document.getElementById('total-carrito');
  const total = carrito.calcularTotal();
  if (totalElement) {
      totalElement.textContent = `Total: $${carrito.calcularTotal()}`;
  }
  localStorage.setItem('carritoTotal', total.toString());
}

function crearBotonesCarrito(element, item) {
  const botonesCarrito = document.createElement('div');
  botonesCarrito.classList.add('botones-carrito');

  botonesCarrito.innerHTML = `
      <button class="btn-quitar">-</button>
      <span class="cantidad">${carrito.obtenerCantidad(item)}</span>
      <button class="btn-agregar">+</button>
  `;

  const btnAgregar = botonesCarrito.querySelector('.btn-agregar');
  const btnQuitar = botonesCarrito.querySelector('.btn-quitar');

  btnAgregar.addEventListener('click', (e) => {
      e.stopPropagation();
      carrito.agregarItem(item);
      actualizarBotonesCarrito(element, item);
  });

  btnQuitar.addEventListener('click', (e) => {
      e.stopPropagation();
      carrito.quitarItem(item);
      actualizarBotonesCarrito(element, item);
  });

  return botonesCarrito;
}

function crearHamburguesaElement(hamburguesa) {
  const hamburguesaElement = document.createElement("div");
  hamburguesaElement.classList.add("hamburguesa");

  hamburguesaElement.innerHTML = `
      <button class="btn btn-primary desplegar">${hamburguesa.boton}</button>    
      <div class="hamburguesa-detalles">
          <img src="${hamburguesa.imagen}" alt="${hamburguesa.nombre}">
          <h3>${hamburguesa.nombre} - $${hamburguesa.precio}</h3>
          <p>${hamburguesa.descripcion}</p>
      </div>
  `;

  const detalles = hamburguesaElement.querySelector(".hamburguesa-detalles");
  const botonesCarrito = crearBotonesCarrito(hamburguesaElement, hamburguesa);
  detalles.appendChild(botonesCarrito);

  const agregarButton = hamburguesaElement.querySelector(".desplegar");
  agregarButton.addEventListener('click', () => {
      detalles.classList.toggle("mostrar-detalles");
  });

  return hamburguesaElement;
}

function crearExtraElement(extra) {
  const extraElement = document.createElement("div");
  extraElement.classList.add("extras");

  extraElement.innerHTML = `
      <div class="extras-detalles">
        <h3>${extra.nombre}</h3>
        <p>${extra.descripcion} - $${extra.precio}</p>
      </div>
  `;

  const botonesCarrito = crearBotonesCarrito(extraElement, extra);
  extraElement.querySelector('.extras-detalles').appendChild(botonesCarrito);

  return extraElement;
}

function crearMenuHamburguesas() {
  const menuHamburguesasElement = document.getElementById("menu-hamburguesas");
  if (!menuHamburguesasElement) return;

  menuHamburguesa.forEach(hamburguesa => {
      const hamburguesaElement = crearHamburguesaElement(hamburguesa);
      menuHamburguesasElement.appendChild(hamburguesaElement);
  });
}

function crearMenuExtras() {
  const menuExtrasElement = document.getElementById("menu-extras");
  if (!menuExtrasElement) return;

  menuExtras.forEach(extra => {
      const extraElement = crearExtraElement(extra);
      menuExtrasElement.appendChild(extraElement);
  });
}

function crearTotalCarrito() {
  const totalCarritoElement = document.createElement('div');
  totalCarritoElement.id = 'total-carrito';
  totalCarritoElement.textContent = `Total: $${carrito.calcularTotal()}`;
  document.body.appendChild(totalCarritoElement);
}

function crearBotonVaciarCarrito() {
  const btnVaciarCarrito = document.createElement('button');
  btnVaciarCarrito.textContent = 'Vaciar Carrito';
  btnVaciarCarrito.id = 'vaciar-carrito';
  btnVaciarCarrito.classList.add('btn', 'btn-danger');
  document.getElementById('tu-contenedor-del-carrito').appendChild(btnVaciarCarrito);
}

const btnVaciarCarrito = document.getElementById('vaciar-carrito');
if (btnVaciarCarrito) {
  btnVaciarCarrito.addEventListener('click', () => {
      carrito.vaciarCarrito();
      document.querySelectorAll('.botones-carrito .cantidad').forEach(span => {
          span.textContent = '0';
      });
      actualizarTotalCarrito();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos(); 
  const totalElement = document.getElementById('total-pedido');
  if (totalElement) {
      const total = localStorage.getItem('carritoTotal') || '0';
      totalElement.textContent = `Total: $${total}`;
  }
});

const form = document.querySelector('form');
const nombre = document.querySelector('input[placeholder="Nombre (Obligatorio)"]');
const ubicacion = document.querySelector('input[placeholder="Ubicacion (Obligatorio)"]');
const telefono = document.querySelector('input[placeholder="Telefono (Obligatorio)"]');
const boton = document.querySelector('.button');

nombre.setAttribute('required', '');
ubicacion.setAttribute('required', '');
telefono.setAttribute('required', '');

telefono.setAttribute('type', 'tel');

telefono.setAttribute('pattern', '[0-9]*');

telefono.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!nombre.value || !ubicacion.value || !telefono.value) {
      alert('Por favor complete todos los campos obligatorios');
      return;
  }

  let mensajePedido = "¡Pedido realizado con éxito!\n\nTu pedido incluye:\n";
  for (let [nombre, cantidad] of carrito.items) {
      const item = [...menuHamburguesa, ...menuExtras].find(i => i.nombre === nombre);
      if (item) {
          mensajePedido += `${cantidad}x ${item.nombre} - $${item.precio * cantidad}\n`;
      }
  }
  mensajePedido += `\nTotal a pagar: $${carrito.calcularTotal()}`;

  alert(mensajePedido);
});