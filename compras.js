const carrito = [];

function agregarProducto(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    actualizarCarrito();
    mostrarMensaje(`"${nombre}" ha sido añadido al carrito`);
}

function quitarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("total");
    listaCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()} COP`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.style.marginLeft = "10px";
        botonEliminar.onclick = () => quitarProducto(index);

        item.appendChild(botonEliminar);
        listaCarrito.appendChild(item);
    });

    totalElemento.textContent = `Total: $${total.toLocaleString()} COP`;
}
document.getElementById("btnPagar").addEventListener("click", function() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda carrito en Local Storage
    window.location.href = "pago.html"; // Redirige a pago.html
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-compra").forEach(boton => {
        boton.addEventListener("click", function () {
            const productoDiv = this.parentElement;
            const productoNombre = productoDiv.getAttribute("data-nombre");
            const productoPrecio = parseInt(productoDiv.getAttribute("data-precio"));
            agregarProducto(productoNombre, productoPrecio);
        });
    });
});

function mostrarMensaje(mensajeTexto) {
    const mensaje = document.getElementById("mensajeConfirmacion");
    mensaje.textContent = mensajeTexto;
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}
