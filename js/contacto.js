const formContacto = document.querySelector('#form-contacto')

formContacto.addEventListener('submit', function (event) {
    event.preventDefault()
    alert('¡Gracias! Pronto te enviaremos la información')
    formContacto.reset()
})
