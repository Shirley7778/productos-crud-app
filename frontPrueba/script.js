const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal 
    ? 'http://localhost:8080'
    : 'https://productos-crud-app-production.up.railway.app/Producto'; // Se actualizará después

const API_URL = `${API_BASE_URL}/productos`;




// Cargar todos los productos
async function cargarProductos() {
    try {
        const res = await fetch(API_URL);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Datos recibidos:', data); // Para debug
        
        // Verificar si hay datos y manejar diferentes formatos
        let productos = [];
        if (data._embedded) {
            if (data._embedded.productoes) {
                productos = data._embedded.productoes;
            } else if (data._embedded.productos) {
                productos = data._embedded.productos;
            }
        } else if (Array.isArray(data)) {
            productos = data;
        }

        const tbody = document.querySelector("#productosTabla tbody");
        tbody.innerHTML = "";

        productos.forEach(producto => {
            // Intentar obtener el ID de diferentes maneras
            let id = producto.id;
            if (!id && producto._links && producto._links.self) {
                id = producto._links.self.href.split("/").pop();
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${id || 'N/A'}</td>
                <td>${producto.nombre ? producto.nombre.toUpperCase() : ''}</td>
                <td>${producto.precio || 0}</td>
                <td>${producto.stock || 0}</td>
                <td>
                    <button class="editar" onclick="editarProducto(${id}, '${producto.nombre}', ${producto.precio}, ${producto.stock})">Editar</button>
                    <button class="eliminar" onclick="eliminarProducto(${id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        // Mostrar mensaje de error en la tabla
        const tbody = document.querySelector("#productosTabla tbody");
        tbody.innerHTML = `<tr><td colspan="5">Error al cargar productos. Verifica que el backend esté funcionando.</td></tr>`;
    }
}


// Crear o actualizar producto
async function guardarProducto() {
    const id = document.getElementById("productoId").value;
    const nombre = document.getElementById("nombre").value.toUpperCase();
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    // Validar campos
    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }

    const producto = { nombre, precio, stock };

    try {
        let metodo = "POST";
        let url = API_URL;

        if (id) {
            metodo = "PUT";
            url = `${API_URL}/${id}`;
        }

        await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });

        limpiarFormulario();
        cargarProductos();
    } catch (error) {
        console.error('Error al guardar producto:', error);
    }
}

// Cargar datos en el formulario para editar
function editarProducto(id, nombre, precio, stock) {
    document.getElementById("productoId").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
}

// Eliminar producto
async function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            cargarProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("productoId").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
}

// Cargar productos al abrir la página
cargarProductos();