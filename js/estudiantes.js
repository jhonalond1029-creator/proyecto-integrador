async function cargarUsuarios() {
    const response = await fetch('usuarios.json')

    return await response.json();
}
