const continuar = true;
while (continuar) {
    const nombre = prompt("Ingrese su nombre:");
    const apellido = prompt("Ingrese su apellido:");
    let telefono;

    do {
        telefono = prompt("Ingrese su número de teléfono (solo números):");
    } while (isNaN(telefono));

    const ubicacion = prompt("Ingrese su ubicación:");

    continuar = false;
}