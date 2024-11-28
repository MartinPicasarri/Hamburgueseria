function InicioUsuario() {
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
  
  InicioUsuario();

class Hamburguesa {
    constructor (nombre="", descripcion="", precio=0){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
const HamburguesaClasica = new Hamburguesa ("Clasica","Contiene pan de papa, medallon de carne y queso cheddar x2", 9800 );
const HamburguesaVegetariana = new Hamburguesa ("Vegetariana","Contiene pan de papa, medallon de verduras y queso cheddar x2", 9500 );
const HamburguesaBacon = new Hamburguesa ("Bacon","Contiene pan de papa, medallon de carne con panceta x2 y queso cheddar x2", 11000 );
const HamburguesaConPollo = new Hamburguesa ("Pollo","Contiene pan de papa, medallon de pollo x2 y queso cheddar x2", 10000 );
const HamburguesaCheese = new Hamburguesa ("Cheese","Contiene pan de papa, medallon de carne x2 con queso cheddar x2", 12000 );
const HamburguesaChili = new Hamburguesa ("Chili","Contiene pan de papa, medallon de carne x2, salsa picante y queso cheddar x2", 12500 );
const HamburguesaBlueCheese = new Hamburguesa ("Blue Cheese","Contiene pan de papa, medallon de carne x2 y queso azul x2", 13000 );

const menuHamburguesa = [HamburguesaClasica, HamburguesaVegetariana, HamburguesaBacon, HamburguesaConPollo, HamburguesaCheese, HamburguesaChili, HamburguesaBlueCheese];

function crearMenu() {
  const menuHamburguesas = document.getElementById("menu-hamburguesas");
  menuHamburguesa.forEach(hamburguesa => {
      const hamburguesaElement = document.createElement("div");
      hamburguesaElement.innerHTML = `
          <h3>${hamburguesa.nombre} - $${hamburguesa.precio}
          <p>${hamburguesa.descripcion}</p>
      `;
      menuHamburguesas.appendChild(hamburguesaElement);
  });
}

function mostrarMenu(menu) {
  menu.forEach(hamburguesa => {
      console.log(`${hamburguesa.nombre} - $${hamburguesa.precio}`);
      console.log(hamburguesa.descripcion);
  });
}

function filtrarHamburguesasPorPrecio(menu, precioMaximo) {
    return menu.filter(hamburguesa => hamburguesa.precio <= precioMaximo);
}
const hamburguesasCostos = filtrarHamburguesasPorPrecio(menuHamburguesa, 10000);
console.log(hamburguesasCostos);

crearMenu();
mostrarMenu(menuHamburguesa);