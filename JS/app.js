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
    constructor (nombre="", descripcion="", precio=0, boton="") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.boton = boton;
    }
}
const HamburguesaClasica = new Hamburguesa ("Clasica","Contiene pan de papa, medallon de carne y queso cheddar x2. Acompañada con papas fritas.", 9800, "CLASICA");
const HamburguesaVegetariana = new Hamburguesa ("Vegetariana","Contiene pan de papa, medallon de verduras y queso cheddar x2. Acompañada con papas fritas.", 9500, "VEGETARIANA");
const HamburguesaBacon = new Hamburguesa ("Bacon","Contiene pan de papa, medallon de carne con panceta x2 y queso cheddar x2. Acompañada con papas fritas.", 11000, "BACON");
const HamburguesaConPollo = new Hamburguesa ("Pollo","Contiene pan de papa, medallon de pollo x2 y queso cheddar x2. Acompañada con papas fritas.", 10000, "POLLO");
const HamburguesaCheese = new Hamburguesa ("Cheese","Contiene pan de papa, medallon de carne x2 con queso cheddar x2. Acompañada con papas fritas.", 12000, "CHEESE");
const HamburguesaChili = new Hamburguesa ("Chili","Contiene pan de papa, medallon de carne x2, salsa picante y queso cheddar x2, acompanada con papas fritas.", 12500, "CHILI");
const HamburguesaBlueCheese = new Hamburguesa ("Blue Cheese","Contiene pan de papa, medallon de carne x2 y queso azul x2. Acompañada con papas fritas", 13000, "BLUECHEESE");
const hamburguesaBBQ = new Hamburguesa ("BBQ","Contiene pan de papa, medallon de carne x2, salsa BBQ y queso cheddar x2. Acompañada con papas fritas.", 11500, "BBQ");
const HamburguesaBigBurguer= new Hamburguesa ("Big Burguer","Contiene pan de papa, medallon de carne x3, cebolla caramelizada, bacon y queso cheddar x3. Acompañada con papas fritas.", 13000, "BIG-BURGUER");

const menuHamburguesa = [HamburguesaClasica, HamburguesaVegetariana, HamburguesaBacon, HamburguesaConPollo, HamburguesaCheese, HamburguesaChili, HamburguesaBlueCheese, hamburguesaBBQ, HamburguesaBigBurguer];


function crearMenu() {
  const menuHamburguesas = document.getElementById("menu-hamburguesas");

  menuHamburguesa.forEach(hamburguesa => {
      const hamburguesaElement = document.createElement("div");
      hamburguesaElement.classList.add("hamburguesa");

      hamburguesaElement.innerHTML = `
          <button class="btn btn-primary agregar-al-carrito">${hamburguesa.boton}</button>
          <div class="hamburguesa-detalles">
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



crearMenu();
mostrarMenu(menuHamburguesa);