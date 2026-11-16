const campoContrasena = document.getElementById("login-contrasena");
const botonContrasena = document.getElementById("btn-ver-contrasena");
const recuperarContraseña = document.querySelector('#recuperar')

botonContrasena.addEventListener("click", function () {
    if (campoContrasena.type === "password") {
        campoContrasena.type = "text";
        botonContrasena.textContent = "🙈";
        botonContrasena.setAttribute("aria-label", "Ocultar contraseña");
    } else {
        campoContrasena.type = "password";
        botonContrasena.textContent = "👁️";
        botonContrasena.setAttribute("aria-label", "Mostrar contraseña");
    }
});

recuperarContraseña.addEventListener('click',()=>{
    alert('se ha enviado un correo de recuperación de la contraseña')
})


