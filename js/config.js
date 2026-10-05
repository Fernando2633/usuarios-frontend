// URL del backend (otra aplicacion). Cambiala por la URL de Render del backend.
// Ejemplo: const API_URL = "https://usuarios-backend-fagr.onrender.com/api/v1/usuarios";
const API_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:8080/api/v1/usuarios"
    : "https://usuarios-backend-fagr.onrender.com/api/v1/usuarios";
