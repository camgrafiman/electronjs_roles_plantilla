const express = require('express');
const router = express.Router();
const { proyectos } = require('../ejemplo_data_db');
const { autorizarUsuario } = require('../autenticacionBasica');
const { puedeVerProyecto, puedeEliminarProyecto, rangoVistaProyectos } = require('../permisos/permisos_proyectos');

router.get('/', autorizarUsuario, (req, res) => {
    /* con esto usamos la funcion rangoVistaProyectos, pasamos el usuario para acceder a usuario.role y */
    res.json(rangoVistaProyectos(req.usuario, proyectos));
});

router.get('/:proyectoId', setProyecto, autorizarUsuario, autorizarEntradaProyecto, (req, res) => {
    res.json(req.proyecto)
});

router.delete('/:proyectoId', setProyecto, autorizarUsuario, autorizarEliminarProyecto, (req, res) => {
    res.send('Proyecto eliminado.');
})

function setProyecto(req, res, next) {
    const proyectoId = parseInt(req.params.proyectoId);
    req.proyecto = proyectos.find(proyecto => proyecto.id === proyectoId)

    if (req.proyecto == null) {
        res.status(404)
        return res.send('Proyecto no encontrado')
    }
    next();
}

function autorizarEntradaProyecto(req, res, next) {
    // Si es true, podrá entrar, de lo contrario será forbidden/ no permitido.
    if (!puedeVerProyecto(req.usuario, req.proyecto)) {
        res.status(401)
        return res.send('No tiene permiso para ver/editar este proyecto. ');
    }
    next();
}

function autorizarEliminarProyecto(req, res, next) {
    // Si es true, podrá entrar, de lo contrario será forbidden/ no permitido.
    if (!puedeEliminarProyecto(req.usuario, req.proyecto)) {
        res.status(401)
        return res.send('No tiene permiso para ver este proyecto. ');
    }
    next();
}

module.exports = router;