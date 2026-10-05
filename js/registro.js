const form = document.getElementById("formRegistro");
const alerta = document.getElementById("alerta");
const btn = document.getElementById("btnRegistrar");

function mostrarAlerta(mensaje, tipo) {
    alerta.className = "alert alert-" + tipo;
    alerta.textContent = mensaje;
}

function validarFormulario(datos) {
    for (const [campo, valor] of Object.entries(datos)) {
        if (!valor || valor.trim() === "") {
            return "Todos los campos son obligatorios.";
        }
    }
    const regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!regexCorreo.test(datos.correo.trim())) {
        return "El correo electrónico no tiene un formato válido.";
    }
    if (datos.usuario.trim().length < 5) {
        return "El usuario debe tener al menos 5 caracteres.";
    }
    if (datos.password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    const fecha = new Date(datos.fechaNacimiento + "T00:00:00");
    if (isNaN(fecha.getTime()) || fecha > new Date()) {
        return "La fecha de nacimiento no es válida.";
    }
    return null;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        apellidoPaterno: document.getElementById("apellidoPaterno").value,
        apellidoMaterno: document.getElementById("apellidoMaterno").value,
        correo: document.getElementById("correo").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value
    };

    const error = validarFormulario(datos);
    if (error) {
        mostrarAlerta(error, "danger");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Registrando...";

    try {
        // AJAX con Fetch API
        const resp = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        const json = await resp.json();

        if (resp.ok) {
            mostrarAlerta("Usuario registrado correctamente.", "success");
            form.reset();
        } else {
            // Mensaje que manda el backend (ej. "El correo electrónico ya está registrado.")
            mostrarAlerta(json.mensaje || "No se pudo registrar el usuario.", "danger");
        }
    } catch (err) {
        mostrarAlerta("No se pudo conectar con el servidor. Intenta de nuevo.", "danger");
    } finally {
        btn.disabled = false;
        btn.textContent = "Registrar";
    }
});
