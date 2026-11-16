
const maxIntentos = 3;
let intentos = 0;

const formLogin = document.getElementById("form-login");
const inputUsuario = document.querySelector('#login-usuario');
const inputContrasena = document.getElementById("login-contrasena");
const btnVerContrasena = document.getElementById("btn-ver-contrasena");
const btnLogin = document.getElementById("btn-login");
const mensaje = document.getElementById("login-mensaje");


async function cargarUsuariosJSON() {
    const response = await fetch('usuarios.json');

    return await response.json();
}

function cargarUsuariosLocales() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    let usuario = inputUsuario.value.trim();
    let contrasena = inputContrasena.value;

    mensaje.textContent = '';

    if (usuario === '' || contrasena === '') {
        mensaje.textContent = "Todos los campos son obligatorios";
        return;
    }

    try {
        const usuariosJSON = await cargarUsuariosJSON();
        const usuariosLocales = cargarUsuariosLocales();
        const usuarios = usuariosJSON.concat(usuariosLocales);

        let encontrado = null;

        for (let i = 0; i < usuarios.length; i++) {
            let coincideUsuario = usuarios[i].usuario === usuario;
            let coincideClave = usuarios[i].contrasena === contrasena;

            if (coincideUsuario && coincideClave) {
                encontrado = usuarios[i];
            }
        }

        if (encontrado !== null) {

            setTimeout(()=>{

                alert(`Bienvenido ${encontrado.nombre}`);
                intentos = 0;
                
                if (encontrado.rol === 'administrador') {
                    window.location.href = 'profesores.html';
                } else {
                    window.location.href = 'estudiante.html';
                }
            },2000)
                
        } else {
            intentos++;
            let restantes = maxIntentos - intentos;

            if (intentos >= maxIntentos) {
                alert("Has superado el número de intentos");
                window.location.href = 'registro.html';
            } else {
                mensaje.textContent = `Usuario o contraseña incorrectos. Te quedan ${restantes} intentos`;
                inputUsuario.value = "";
                inputContrasena.value = "";
                inputContrasena.focus();
            }
        }

    } catch (error) {
        console.error(error);
        mensaje.textContent = "No se pudo cargar la información, intenta más tarde";
    }
});