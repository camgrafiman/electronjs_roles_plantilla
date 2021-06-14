const ROLE = {
    ADMIN: 'admin',
    EMPLEADO: 'empleado'
}

module.exports = {
    ROLE: ROLE,
    usuarios: [
        { id: 1, nombre: 'Administrador 1', role: ROLE.ADMIN },
        { id: 2, nombre: 'Administrador 2', role: ROLE.ADMIN },
        { id: 3, nombre: 'Juan', role: ROLE.EMPLEADO },
        { id: 4, nombre: 'María', role: ROLE.EMPLEADO },
        { id: 5, nombre: 'Pedro', role: ROLE.EMPLEADO }

    ],
    proyectos: [
        { id: 1, nombre: 'Proyecto de Admin', idUsuario: 1 },
        { id: 2, nombre: 'Proyecto de Administrador 2', idUsuario: 2 },
        { id: 3, nombre: 'Proyecto de Juan', idUsuario: 3 },
        { id: 4, nombre: 'Proyecto de María', idUsuario: 4 },
        { id: 5, nombre: 'Proyecto de Pedro', idUsuario: 5 },
    ]
}