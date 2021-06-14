const plantilla = [{
        label: 'View',
        submenu: [{
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'window',
        submenu: [{
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [{
            label: 'Open Log File',
            click: function() {
                electron.shell.openItem(os.homedir() + '/Library/Logs/electron-express/log.log');
            }
        }]
    }
];

plantilla.unshift({
    label: 'Program',
    submenu: [{
            role: 'about'
        },
        {
            type: 'separator'
        },
        {
            role: 'services',
            submenu: []
        },
        {
            type: 'separator'
        },
        {
            role: 'hide'
        },
        {
            role: 'hideothers'
        },
        {
            role: 'unhide'
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]
});

module.exports = plantilla;