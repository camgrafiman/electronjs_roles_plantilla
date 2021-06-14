/*archivos de express: */
const server = require('./express/express_app');

// ELECTRON REQUIREMENTS:
const electron = require('electron');
const electronApp = electron.app;
const { BrowserWindow } = require('electron');

const log = require('electron-log')
log.transports.console.level = 'info';
log.transports.file.level = 'info';

/* Helpers: */
const os = require('os');
const path = require('path');
const url = require('url');



/* Tener una referencia global al objeto window/ventana, de lo contrario la ventana será */
/* cerrada automaticamente cuando el objeto de javascript sea recolectado en la basura.*/
var ventanaPrincipal;
var servidor;
var apagando;

function empezarExpress() {
    // Crear el path del servidor de express para pasar la llamada:
    // Create the path of the express server to pass in with the spawn call:
    var servidorDirectorio = path.join(__dirname, 'http', 'bin', 'www');
    log.info('Empezando el node script: ' + servidorDirectorio);

    var nodePath = "/usr/local/bin/node";
    if (process.platform === 'win32') {
        // Overwrite with the windows path...only testing on mac currently
        nodePath = "C:\\Program Files\\nodejs\\node.exe";
    }

    /* Opcionalmente actualizar las variables de entorno usadas */
    var env = JSON.parse(JSON.stringify(process.env));

    /* Empezar el servidor de node: */
    const spawn = require('child_process').spawn;
    servidor = spawn(nodePath, [servidorDirectorio], { env: env });

    /* Ha tenido éxito? */
    if (!servidor) {
        log.info("No se ha podido ejecutar el servidor node.");
        return;
    }

    /* Maneja la data de los procesos hijos: */
    servidor.stdout.on('data', (data) => {
        log.info('data: ' + data);
    });

    /* Ejecutado cuando un proceso hijo usa process.send() para enviar mensajes. */
    servidor.on('message', function(message) {
        log.info(message);
    })

    /* Maneja los cierres de los procesos hijos. */
    servidor.on('close', function(code) {
        log.info('El proceso hijo se ha cerrado con código ' + code);
        servidor = null;

        // /* Solo reiniciar si se ha "matado" por alguna razón.. */
        // if (!apagando) {
        //     log.info('Reiniciando....');
        //     empezarExpress();
        // }
    });

    /* Manejar el stream del proceso hijo stderr */
    servidor.stderr.on('data', function(data) {
        log.info('stderr: ' + data);
    })

    /* Ocurre cuando: */
    // El proceso no pudo aparecer, o
    // No pudo ser finalizado, o
    // Enviando un mensae el proceso hijo falla.
    servidor.on('error', function(err) {
        log.info('Servidor de node error: ' + err);
    })



}

/* Función crearVentana: */
function crearVentana() {

    /* Crear la ventana principal de Electron: */
    ventanaPrincipal = new BrowserWindow({
        width: 900,
        height: 900,
        title: 'Electron título',
        webPreferences: {
            nodeIntegration: true
        }
    });

    /* IMPORTANTE: */
    /* Crear la URL para correr localmente el servidor de express: */
    ventanaPrincipal.loadURL(url.format({
        // pathname: path.join(__dirname, 'index.html'),
        // protocol: 'file:',
        // slashes: true,
        // webPreferences: {
        //     nodeIntegration: true
        // }
        pathname: 'localhost:5000',
        worldSafeMode: true,
        protocol: 'http:',
        slashes: true,
        webPreferences: {
            nodeIntegration: true
        }
    }));

    /* Emitido cuando la ventana se cierra: */
    ventanaPrincipal.on('closed', function() {
        ventanaPrincipal = null;
    });

    /* Llamar la plantilla del menu: */
    const plantilla = require('./menuPlantilla');

    const Menu = electron.Menu;
    const menuPersonalizado = Menu.buildFromTemplate(plantilla);
    Menu.setApplicationMenu(menuPersonalizado);
}


/* ============ IMPORTANTE ========= */
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electronApp.on('ready', function() {
    apagando = false;
    /* Cargar express antes de la ventana. */
    //empezarExpress();
    crearVentana();
});

// Called before quitting...gives us an opportunity to shutdown the child process
electronApp.on('before-quit', function() {
    log.info('gracefully shutting down...');

    // Need this to make sure we don't kick things off again in the child process
    apagando = true;

    // Kill the web process
    servidor.kill();
});

// Quit when all windows are closed.
electronApp.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electronApp.quit()
    }
});

//if (process.platform === "win32") {
//	var rl = require("linebyline").createInterface({
//		input: process.stdin,
//		output: process.stdout
//	});
//
//	rl.on("SIGINT", function () {
//		process.emit("SIGINT");
//	});
//}

process.on("SIGINT", function() {
    //graceful shutdown
    log.info('shutting down...');
    process.exit();
});



// electronApp.on('activate', function() {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (ventanaPrincipal === null) {
//         crearVentana();
//     }
// });


/* FIN TUTORIAL */