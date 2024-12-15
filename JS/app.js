class Hamburguesa {
    constructor(nombre = "", descripcion = "", precio = 0, boton = "", imagen = "") {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.boton = boton;
        this.imagen = imagen;
    }
}

class Extras {
    constructor(nombre = "", descripcion = "", precio = 0) {
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
        this.calcularTotal();
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
        actualizarTotalPedido();
    }

    obtenerItems() {
        return Array.from(this.items.entries());
    }
}

let menuHamburguesa = [];
let menuExtras = [];
const carrito = new Carrito();

function crearMenuHamburguesas() {
    const menuHamburguesasElement = document.getElementById('menu-hamburguesas');
    if (!menuHamburguesasElement) return;

    menuHamburguesasElement.innerHTML = '';
    menuHamburguesa.forEach(hamburguesa => {
        const hamburguesaElement = document.createElement('div');
        hamburguesaElement.className = 'hamburguesa-item';
        hamburguesaElement.innerHTML = `
           <div class="hamburgusa-detalles">
                <h3>-${hamburguesa.nombre}-$${hamburguesa.precio}</h3>
                <p>-${hamburguesa.descripcion}</p>
            </div>
            <div class= "botones-carrito">
                <button class="agregar">+</button>
                <span class="cantidad">${carrito.obtenerCantidad(hamburguesa)}</span>
                <button class="quitar">-</button>
                <img src="${hamburguesa.imagen}" alt="${hamburguesa.nombre}">
            </div>
        `;
        menuHamburguesasElement.appendChild(hamburguesaElement);

        const agregarBtn = hamburguesaElement.querySelector('.agregar');
        const quitarBtn = hamburguesaElement.querySelector('.quitar');

        agregarBtn.addEventListener('click', () => {
            carrito.agregarItem(hamburguesa);
            actualizarBotonesCarrito(hamburguesaElement, hamburguesa);
        });

        quitarBtn.addEventListener('click', () => {
            carrito.quitarItem(hamburguesa);
            actualizarBotonesCarrito(hamburguesaElement, hamburguesa);
        });
    });
}

function crearMenuExtras() {
    const menuExtrasElement = document.getElementById('menu-extras');
    if (!menuExtrasElement) return;

    menuExtrasElement.innerHTML = '';
    menuExtras.forEach(extra => {
        const extraElement = document.createElement('div');
        extraElement.className = 'extra-item';
        extraElement.innerHTML = `
            <h3>${extra.nombre}</h3>
            <p>${extra.descripcion}</p>
            <p>Precio: $${extra.precio}</p>
            <div class="botones-carrito">
                <button class="agregar">+</button>
                <span class="cantidad">${carrito.obtenerCantidad(extra)}</span>
                <button class="quitar">-</button>
            </div>
        `;
        menuExtrasElement.appendChild(extraElement);

        const agregarBtn = extraElement.querySelector('.agregar');
        const quitarBtn = extraElement.querySelector('.quitar');

        agregarBtn.addEventListener('click', () => {
            carrito.agregarItem(extra);
            actualizarBotonesCarrito(extraElement, extra);
        });

        quitarBtn.addEventListener('click', () => {
            carrito.quitarItem(extra);
            actualizarBotonesCarrito(extraElement, extra);
        });
    });
}

async function cargarProductos() {
    try {
        const response = await fetch('../productos.json');
        const data = await response.json();
        
        menuHamburguesa = data.hamburguesas.map(h => new Hamburguesa(h.nombre, h.descripcion, h.precio, h.boton, h.imagen));
        menuExtras = data.extras.map(e => new Extras(e.nombre, e.descripcion, e.precio));
        
        if (document.getElementById('menu-hamburguesas')) {
            crearMenuHamburguesas();
            crearMenuExtras();
        }
        
        actualizarTotalCarrito();
        actualizarTotalPedido();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function actualizarBotonesCarrito(element, item) {
    const cantidad = carrito.obtenerCantidad(item);
    const botonesCarrito = element.querySelector('.botones-carrito');

    if (botonesCarrito) {
        const cantidadSpan = botonesCarrito.querySelector('.cantidad');
        cantidadSpan.textContent = cantidad;
    }
    actualizarTotalCarrito();
    actualizarTotalPedido();
}

function actualizarTotalCarrito() {
    const totalElement = document.getElementById('total-carrito');
    const total = carrito.calcularTotal();
    if (totalElement) {
        totalElement.textContent = `Total: $${total}`;
    }
}

function actualizarTotalPedido() {
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        const total = carrito.calcularTotal();
        totalAmountElement.textContent = total;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
    
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito.vaciarCarrito();
            document.querySelectorAll('.botones-carrito .cantidad').forEach(span => {
                span.textContent = '0';
            });
        });
    }

    const form = document.querySelector('form');
    if (form) {
        const nombre = document.querySelector('input[placeholder="Nombre (Obligatorio)"]');
        const ubicacion = document.querySelector('input[placeholder="Ubicacion (Obligatorio)"]');
        const telefono = document.querySelector('input[placeholder="Telefono (Obligatorio)"]');
        const textarea = document.querySelector('textarea');

        nombre.setAttribute('required', '');
        ubicacion.setAttribute('required', '');
        telefono.setAttribute('required', '');
        telefono.setAttribute('type', 'tel');
        telefono.setAttribute('pattern', '[0-9]*');

        actualizarTotalPedido();

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!nombre.value || !ubicacion.value || !telefono.value) {
                alert('Por favor complete todos los campos obligatorios');
                return;
            }

            let mensajePedido = "¡Pedido realizado con éxito!\n\n";
            mensajePedido += `Nombre: ${nombre.value}\n`;
            mensajePedido += `Ubicación: ${ubicacion.value}\n`;
            mensajePedido += `Teléfono: ${telefono.value}\n\n`;
            
            if (textarea.value) {
                mensajePedido += `Comentarios adicionales: ${textarea.value}\n\n`;
            }
            
            mensajePedido += "Tu pedido incluye:\n";
            
            const itemsCarrito = carrito.obtenerItems();
            
            if (itemsCarrito.length === 0) {
                mensajePedido += "No hay items en el carrito.\n";
            } else {
                itemsCarrito.forEach(([nombre, cantidad]) => {
                    const item = [...menuHamburguesa, ...menuExtras].find(i => i.nombre === nombre);
                    if (item) {
                        const subtotal = item.precio * cantidad;
                        mensajePedido += `${cantidad}x ${item.nombre} - $${subtotal}\n`;
                    }
                });
            }
            
            const totalGastado = carrito.calcularTotal();
            mensajePedido += `\nTotal a pagar: $${totalGastado}`;
            
            alert(mensajePedido);
            
            carrito.vaciarCarrito();
            window.location.href = '../index.html';
        });
    }
});