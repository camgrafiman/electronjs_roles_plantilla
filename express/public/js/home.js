console.log("Hola desde home.js");

const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const btnVentana = document.getElementById('btnVentana');

btnVentana.addEventListener('click', function(e) {
    let ventana3 = new BrowserWindow({
        frame: false,
        show: false,
        width: 500,
        height: 300,
        maxHeight: 300,
        maxWidth: 500,
        minHeight: 300,
        minWidth: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    ventana3.loadURL(url.format({
        pathname: path.join(__dirname, '../../ventana3.html'),
        protocol: 'file',
        slashes: true
    }));
    ventana3.on('closed', () => {
        ventana3 = null;
    });

    ventana3.once('ready-to-show', () => {
        ventana3.show();
    })
})