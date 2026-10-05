const formBusqueda = document.getElementById("formBusqueda");
const inputTexto = document.getElementById("texto");
const alerta = document.getElementById("alerta");
const contenedor = document.getElementById("contenedorResultados");
const lista = document.getElementById("resultados");
const titulo = document.getElementById("tituloResultados");

const MIN_CARACTERES = 3;
let temporizador = null;

function escaparHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto ?? "";
    return div.innerHTML;
}

function resaltar(texto, busqueda) {
    const seguro = escaparHtml(texto);
    const patron = busqueda.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return seguro.replace(new RegExp("(" + patron + ")", "gi"), "<mark>$1</mark>");
}

function limpiar() {
    alerta.classList.add("d-none");
    contenedor.classList.add("d-none");
    lista.innerHTML = "";
}

function mostrarAviso(mensaje) {
    contenedor.classList.add("d-none");
    alerta.textContent = mensaje;
    alerta.classList.remove("d-none");
}

function pintarResultados(usuarios, texto) {
    alerta.classList.add("d-none");
    contenedor.classList.remove("d-none");

    if (usuarios.length === 0) {
        titulo.textContent = "No se encontraron resultados para \"" + texto + "\".";
        return;
    }
    titulo.textContent = "Resultados encontrados: " + usuarios.length;
    lista.innerHTML = usuarios.map(u => {
        const nombre = `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`;
        const inicial = escaparHtml(u.nombre.charAt(0).toUpperCase());
        return `
            <div class="resultado">
                <div class="avatar">${inicial}</div>
                <div>
                    <div class="fw-semibold">${resaltar(nombre, texto)}</div>
                    <div class="arroba">@${resaltar(u.usuario, texto)}</div>
                </div>
            </div>`;
    }).join("");
}

async function buscar() {
    const texto = inputTexto.value.trim();

    // Regla: con menos de 3 caracteres NO se hace la busqueda
    if (texto.length < MIN_CARACTERES) {
        if (texto.length === 0) {
            limpiar();
        } else {
            mostrarAviso("La búsqueda debe contener al menos 3 caracteres.");
        }
        return;
    }

    try {
        // AJAX con Fetch API -> el filtro lo hace el servidor/BD
        const resp = await fetch(API_URL + "/buscar?texto=" + encodeURIComponent(texto));
        const json = await resp.json();
        if (!resp.ok) {
            mostrarAviso(json.mensaje || "Error al buscar.");
            return;
        }
        pintarResultados(json, texto);
    } catch (err) {
        mostrarAviso("No se pudo conectar con el servidor.");
    }
}

// Busca mientras escribe (como Facebook), con un pequeño retraso
inputTexto.addEventListener("input", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(buscar, 350);
});

formBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(temporizador);
    buscar();
});
