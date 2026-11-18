async function cargarUsuarios() {
    const response = await fetch('usuarios.json')

    return await response.json();
}

const sesion = JSON.parse(localStorage.getItem('sesion'));
const nombreUsuario = document.querySelector('#nombre-usuario');

if (sesion === null) {
    // Nadie ha iniciado sesión: lo mandamos al login
    window.location.href = 'login.html';
} else {
    nombreUsuario.textContent = sesion.nombre;
}
