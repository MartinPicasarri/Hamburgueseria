class Hamburguesa {
    constructor (nombre="", descripcion="", precio=0, boton="", imagen="") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.boton = boton;
        this.imagen = "";
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
  }

  agregarItem(hamburguesa) {
      const cantidad = this.items.get(hamburguesa.nombre) || 0;
      this.items.set(hamburguesa.nombre, cantidad + 1);
  }

  quitarItem(hamburguesa) {
      const cantidad = this.items.get(hamburguesa.nombre) || 0;
      if (cantidad > 0) {
          this.items.set(hamburguesa.nombre, cantidad - 1);
          if (this.items.get(hamburguesa.nombre) === 0) {
              this.items.delete(hamburguesa.nombre);
          }
      }
  }

  obtenerCantidad(hamburguesa) {
      return this.items.get(hamburguesa.nombre) || 0;
  }
}

const HamburguesaClasica = new Hamburguesa ("Clasica","Contiene pan de papa, medallon de carne, tomate, lechuga y queso cheddar. Acompañada con papas fritas.", 9800, "CLASICA", "../IMG/hamburguesa-clasica.jpeg");
const HamburguesaVegetariana = new Hamburguesa ("Vegetariana","Contiene pan de papa, medallon de verduras, pepino, lechuga y queso cheddar x2. Acompañada con papas fritas.", 9500, "VEGETARIANA", "../IMG/hamburguesa-vegetariana.jpeg");
const HamburguesaBacon = new Hamburguesa ("Bacon","Contiene pan de papa, medallon de carne con panceta x2 y queso cheddar x2. Acompañada con papas fritas.", 11000, "BACON", "../IMG/hamburguesa-bacon.jpeg");
const HamburguesaConPollo = new Hamburguesa ("Pollo","Contiene pan de papa, medallon de pollo x2 y queso cheddar x2. Acompañada con papas fritas.", 10000, "POLLO", "../IMG/hamburguesa-pollo.jpeg");
const HamburguesaCheese = new Hamburguesa ("Cheese","Contiene pan de papa, medallon de carne x2 y con extra queso cheddar. Acompañada con papas fritas.", 12000, "CHEESE", "../IMG/hamburguesa-cheese.jpeg");
const HamburguesaChili = new Hamburguesa ("Chili","Contiene pan de papa, medallon de carne x2, pepino,salsa picante y queso cheddar x2, acompanada con papas fritas.", 12500, "CHILI", "../IMG/hamburguesa-chili.jpeg");
const HamburguesaBlueCheese = new Hamburguesa ("Blue Cheese","Contiene pan de papa, lechuga, medallon de carne x2 y queso azul. Acompañada con papas fritas", 10500, "BLUECHEESE", "../IMG/hamburguesa-bluecheese.jpeg");
const hamburguesaBBQ = new Hamburguesa ("BBQ","Contiene pan de papa, medallon de carne x2, salsa BBQ y queso cheddar x2. Acompañada con papas fritas.", 11500, "BBQ", "../IMG/hamburguesa-bbq.jpeg");
const HamburguesaBigBurguer= new Hamburguesa ("Big Burguer","Contiene pan de papa, medallon de carne x3, cebolla caramelizada, bacon y queso cheddar x3. Acompañada con papas fritas.", 13000, "BIG-BURGUER", "../IMG/hamburguesa-bigburguer.jpeg");

const menuHamburguesa = [HamburguesaClasica, HamburguesaVegetariana, HamburguesaBacon, HamburguesaConPollo, HamburguesaCheese, HamburguesaChili, HamburguesaBlueCheese, hamburguesaBBQ, HamburguesaBigBurguer];

const MedallondeCarne = new Extras ("Medallon de carne","Agrega un medallon de carne", 1000);
const MedallondePollo = new Extras ("Medallon de pollo","Agrega un medallon de pollo", 1000);
const Nuggets = new Extras ("Nuggets","Agrega Nuggets x12", 1000);
const CebollaCaramelizada = new Extras ("Cebolla caramelizada","Agrega cebolla caramelizada", 1000);
const Bacon = new Extras ("Bacon","Agrega panceta", 1000);
const PapasconCheddar = new Extras ("Papas con queso cheddar","Agrega papas con queso cheddar", 1000);
const SalsaBBQ = new Extras ("Salsa BBQ","Agrega salsa BBQ", 1000);
const SalsaPicante = new Extras ("Salsa picante","Agrega salsa picante", 1000);

const menuExtras = [MedallondeCarne, MedallondePollo, Nuggets, CebollaCaramelizada, Bacon, PapasconCheddar, SalsaBBQ, SalsaPicante];

const carrito = new Carrito();

function actualizarBotonesCarrito(element, item) {
  const cantidad = carrito.obtenerCantidad(item);
  const botonesCarrito = element.querySelector('.botones-carrito');
  
  if (botonesCarrito) {
      const cantidadSpan = botonesCarrito.querySelector('.cantidad');
      cantidadSpan.textContent = cantidad;
  }
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

// Menu Creation Functions
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  crearMenuHamburguesas();
  crearMenuExtras();
});