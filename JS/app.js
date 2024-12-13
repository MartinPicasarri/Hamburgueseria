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
        localStorage.setItem("carritoTotal", total.toString());
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

    obtenerItems() {
        return Array.from(this.items.entries());
    }
}

let menuHamburguesa = [];
let menuExtras = [];

async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        const data = await response.json();
        
        menuHamburguesa = data.hamburguesas.map(h => new Hamburguesa(h.nombre, h.descripcion, h.precio, h.boton, h.imagen));
        menuExtras = data.extras.map(e => new Extras(e.nombre, e.descripcion, e.precio));
        
        crearMenuHamburguesas();
        crearMenuExtras();
        actualizarTotalCarrito();
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
        totalElement.textContent = `Total: $${total}`;
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

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito.vaciarCarrito();
            document.querySelectorAll('.botones-carrito .cantidad').forEach(span => {
                span.textContent = '0';
            });
        });
    }
});

