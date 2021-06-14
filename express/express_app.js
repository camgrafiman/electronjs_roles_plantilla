const express = require('express');
const expressApp = express();
const path = require('path');
const { ROLE, usuarios } = require('./ejemplo_data_db');
const { autorizarUsuario, autorizarRol } = require('./autenticacionBasica')
const proyectosRouter = require('./rutas/proyectos')

// expressApp.use(cors());
expressApp.use(express.json())
expressApp.use(setUsuario);
expressApp.use(express.static(__dirname + '/public'));
expressApp.use('/static', express.static(__dirname + '/public'));
// expressApp.use('/static', express.static(__dirname + '/public'));

expressApp.use('/proyectos', proyectosRouter);

expressApp.get('/', (req, res) => {
    // res.send('Página home.')
    res.sendFile(path.join(__dirname + '/home.html'));
    // res.render(__dirname + '/home.html')
});


expressApp.get('/dashboard', autorizarUsuario, (req, res) => {
    res.send('Página Dashboard ')
});


expressApp.get('/admin', autorizarUsuario, autorizarRol(ROLE.ADMIN), (req, res) => {
    res.send('Admin page. Página con acceso solo para el administrador.')
});

function setUsuario(req, res, next) {
    const idUsuario = req.body.idUsuario;
    if (idUsuario) {
        req.usuario = usuarios.find(usuario => usuario.id === idUsuario)
    }
    next();
}

var server = expressApp.listen(5000, function() { console.log('Servidor en puerto: ' + server.address().port) });

module.exports = server;