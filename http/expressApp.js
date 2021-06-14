const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require(path.join(__dirname, 'rutas', 'index'));
const users = require(path.join(__dirname, 'rutas', 'users'));

const expressApp = express();

const { ROLE, usuarios } = require('./ejemplo_data_db');
const { autorizarUsuario, autorizarRol } = require('./autenticacionBasica')
const proyectosRouter = require('./rutas/proyectos')



// view engine setup OPCIONAL* 
// expressApp.set('views', path.join(__dirname, 'views'));
// expressApp.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// expressApp.listen(3000);

// expressApp.use(bodyParser.json());
// expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.json())
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));

//expressApp.use('/', index);
expressApp.use('/users', users);

expressApp.use('/', index);
expressApp.use(setUsuario);
expressApp.use('/proyectos', proyectosRouter);

// catch 404 and forward to error handler
expressApp.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// expressApp.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.expressApp.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });





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



////////////////////////// 

// const express = require('express');
// const app = express();
// const { ROLE, usuarios } = require('./ejemplo_data_db');
// const { autorizarUsuario, autorizarRol } = require('./autenticacionBasica')
// const proyectosRouter = require('./rutas/proyectos')


// app.use(express.json())
// app.use(setUsuario);
// app.use('/proyectos', proyectosRouter);

// app.get('/', (req, res) => {
//     res.send('Página home.')
// });

// app.get('/dashboard', autorizarUsuario, (req, res) => {
//     res.send('Página Dashboard ')
// });

// app.get('/admin', autorizarUsuario, autorizarRol(ROLE.ADMIN), (req, res) => {
//     res.send('Admin page. Página con acceso solo para el administrador.')
// });

// function setUsuario(req, res, next) {
//     const idUsuario = req.body.idUsuario;
//     if (idUsuario) {
//         req.usuario = usuarios.find(usuario => usuario.id === idUsuario)
//     }
//     next();
// }

// app.listen(3000);

module.exports = expressApp;