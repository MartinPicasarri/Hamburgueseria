/*function InicioUsuario() {
    let usuario, apellido, ubicacion, telefono;
    let telefonoValido = false;
  
    do {
      usuario = prompt("Ingrese su usuario");
      apellido = prompt("Ingrese su apellido");
      ubicacion = prompt("Ingrese su ubicacion/zona");
      telefono = prompt("Ingrese su telefono");
  
      telefonoValido = !isNaN(telefono); 
      if (!telefonoValido) {
        alert("El número de teléfono debe contener solo números. Intente nuevamente.");
      }
    } while (!telefonoValido);
  
    alert(`Su usuario es ${usuario} ${apellido} y vive en ${ubicacion}. Su teléfono es ${telefono}`);
  }
  
  InicioUsuario();*/

class Hamburguesa {
    constructor (nombre="", descripcion="", precio=0, boton="", imagen="") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.boton = boton;
        this.imagen = "";
    }
}
const HamburguesaClasica = new Hamburguesa ("Clasica","Contiene pan de papa, medallon de carne y queso cheddar x2. Acompañada con papas fritas.", 9800, "CLASICA", "../IMG/clasica.jpg");
const HamburguesaVegetariana = new Hamburguesa ("Vegetariana","Contiene pan de papa, medallon de verduras y queso cheddar x2. Acompañada con papas fritas.", 9500, "VEGETARIANA", "../IMG/vegetariana.jpg");
const HamburguesaBacon = new Hamburguesa ("Bacon","Contiene pan de papa, medallon de carne con panceta x2 y queso cheddar x2. Acompañada con papas fritas.", 11000, "BACON", "../IMG/bacon.jpg");
const HamburguesaConPollo = new Hamburguesa ("Pollo","Contiene pan de papa, medallon de pollo x2 y queso cheddar x2. Acompañada con papas fritas.", 10000, "POLLO", "../IMG/pollo.jpg");
const HamburguesaCheese = new Hamburguesa ("Cheese","Contiene pan de papa, medallon de carne x2 con queso cheddar x2. Acompañada con papas fritas.", 12000, "CHEESE", "../IMG/cheese.jpg");
const HamburguesaChili = new Hamburguesa ("Chili","Contiene pan de papa, medallon de carne x2, salsa picante y queso cheddar x2, acompanada con papas fritas.", 12500, "CHILI", "../IMG/chili.jpg");
const HamburguesaBlueCheese = new Hamburguesa ("Blue Cheese","Contiene pan de papa, medallon de carne x2 y queso azul x2. Acompañada con papas fritas", 13000, "BLUECHEESE", "../IMG/bluecheese.jpg");
const hamburguesaBBQ = new Hamburguesa ("BBQ","Contiene pan de papa, medallon de carne x2, salsa BBQ y queso cheddar x2. Acompañada con papas fritas.", 11500, "BBQ", "../IMG/bbq.jpg");
const HamburguesaBigBurguer= new Hamburguesa ("Big Burguer","Contiene pan de papa, medallon de carne x3, cebolla caramelizada, bacon y queso cheddar x3. Acompañada con papas fritas.", 13000, "BIG-BURGUER", "../IMG/bigburguer.jpg");

const menuHamburguesa = [HamburguesaClasica, HamburguesaVegetariana, HamburguesaBacon, HamburguesaConPollo, HamburguesaCheese, HamburguesaChili, HamburguesaBlueCheese, hamburguesaBBQ, HamburguesaBigBurguer];

function crearMenu() {
  const menuHamburguesas = document.getElementById("menu-hamburguesas");

  menuHamburguesa.forEach(hamburguesa => {
      const hamburguesaElement = document.createElement("div");
      hamburguesaElement.classList.add("hamburguesa");

      hamburguesaElement.innerHTML = `
      <button class="btn btn-primary agregar-al-carrito">${hamburguesa.boton}</button>    
      <div class="hamburguesa-detalles">
              <img src="${hamburguesa.imagen}" alt="${hamburguesa.nombre}">
              <h3>${hamburguesa.nombre} - $${hamburguesa.precio}</h3>
              <p>${hamburguesa.descripcion}</p>
          </div>
      `;

      menuHamburguesas.appendChild(hamburguesaElement);

      const agregarButton = hamburguesaElement.querySelector(".agregar-al-carrito");
      agregarButton.addEventListener('click', () => {
          const detalles = hamburguesaElement.querySelector(".hamburguesa-detalles");
          detalles.classList.toggle("mostrar-detalles");
      });
  });
}


class Extras {
    constructor (nombre="", descripcion="", precio=0,) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
const MedallondeCarne = new Extras ("Medallon de carne","Agrega un medallon de carne", 1000);
const MedallondePollo = new Extras ("Medallon de pollo","Agrega un medallon de pollo", 1000);
const Nuggets = new Extras ("Nuggets","Agrega Nuggets x12", 1000);
const CebollaCaramelizada = new Extras ("Cebolla caramelizada","Agrega cebolla caramelizada", 1000);
const Bacon = new Extras ("Bacon","Agrega panceta", 1000);
const QuesoCheddar = new Extras ("Queso cheddar","Agrega queso cheddar", 1000);
const SalsaBBQ = new Extras ("Salsa BBQ","Agrega salsa BBQ", 1000);
const SalsaPicante = new Extras ("Salsa picante","Agrega salsa picante", 1000);

const menuExtras = [MedallondeCarne, MedallondePollo, Nuggets, CebollaCaramelizada, Bacon, QuesoCheddar, SalsaBBQ, SalsaPicante];

function crearExtras() {
    const menuExtrasElement = document.getElementById("menu-extras");

    menuExtras.forEach(extras => {
        const extrasElement = document.createElement("div");
        extrasElement.classList.add("extras");

        extrasElement.innerHTML = `
        <div class="extras-detalles">
              <h3>${extras.nombre}</h3>
              <p>${extras.descripcion} - $${extras.precio}</p>
          </div>
      `;

        menuExtrasElement.appendChild(extrasElement);
    });
}


crearMenu();
crearExtras();