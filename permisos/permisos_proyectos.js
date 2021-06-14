const { ROLE } = require('../ejemplo_data_db')

/* Función para permitir ver proyecto según id, o todos si es el administrador. */
function puedeVerProyecto(usuario, proyecto) {

    return (
        usuario.role === ROLE.ADMIN || proyecto.idUsuario === usuario.id
    )

}

/*controla quien puede borrar un proyecto: */
function puedeEliminarProyecto(usuario, proyecto) {

    return (
        usuario.role === ROLE.ADMIN || proyecto.idUsuario === usuario.id
    )
}

/* Función para mostrar listado de proyectos que puede ver cada rol según su id, o mostrar todos si es administrador */
function rangoVistaProyectos(usuario, proyectos) {
    if (!usuario) return { mensaje: "No hay proyectos para no usuarios." };
    if (usuario.role === ROLE.ADMIN) return proyectos;
    return proyectos.filter(proyecto => proyecto.id === usuario.id)
}

module.exports = { puedeVerProyecto, rangoVistaProyectos, puedeEliminarProyecto }