const formulario = document.querySelector('#form-registro')
const nombre = document.querySelector('#nombre')
const correo = document.querySelector('#correo')
const telefono = document.querySelector('#telefono')
const usuario = document.querySelector('#usuario')
const contrasena = document.querySelector('#contrasena')
const repassword = document.querySelector('#repassword') 

async function cargarUsuariosJSON() {
    const response = await fetch('usuarios.json')

    if (!response.ok) {
        throw new Error('No se pudo leer usuarios.json (código ' + response.status + ')')
    }

    return await response.json()
}

formulario.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (contrasena.value !== repassword.value) {
        alert('La contraseña no coincide')
        return
    }

    const correoNuevo = correo.value.trim()
    const usuarioNuevo = usuario.value.trim()

    try {
        const usuariosJSON = await cargarUsuariosJSON()
        const usuariosLocales = JSON.parse(localStorage.getItem('usuarios')) || []
        const todos = usuariosJSON.concat(usuariosLocales)

        let correoExiste = false
        let usuarioExiste = false

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].correo === correoNuevo) {
                correoExiste = true
            }
            if (todos[i].usuario === usuarioNuevo) {
                usuarioExiste = true
            }
        }

        if (correoExiste) {
            alert('Ese correo ya está registrado')
            return
        }
        if (usuarioExiste) {
            alert('Ese usuario ya existe')
            return
        }

        const newUsuario = {
            nombre: nombre.value.trim(),
            correo: correoNuevo,
            telefono: telefono.value.trim(),
            contrasena: contrasena.value,
            usuario: usuarioNuevo,
            rol: 'estudiante'
        }

        usuariosLocales.push(newUsuario)
        localStorage.setItem('usuarios', JSON.stringify(usuariosLocales))

        alert('¡Registro exitoso!')
        formulario.reset()
        window.location.href = 'login.html'

    } catch (error) {
        console.error(error)
        alert('No se pudo completar el registro, intenta más tarde')
    }
})