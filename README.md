# usuarios-frontend

Frontend independiente (HTML, CSS, JavaScript y Bootstrap 5) que consume la API REST de `usuarios-backend` con **Fetch API (AJAX)**.

Fernando Antonio García Ruiz – 7CM1 – UPIIZ IPN

## Páginas

- `registro.html` → Registro de usuario (alta)
- `busqueda.html` → Buscador de personas (estilo Facebook, mínimo 3 caracteres)
- `index.html` → Inicio con links a las dos páginas

## Configuración

En `js/config.js` se pone la URL del backend desplegado en Render.

## Correr en local

Abrir con Live Server (o `npx serve .`) mientras el backend corre en `http://localhost:8080`.

## Render

**New → Static Site**, Build Command vacío, Publish Directory: `.`
