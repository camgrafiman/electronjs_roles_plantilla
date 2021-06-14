  /*
   * Copyright (C) 2017 Jason Henderson
   *
   * This software may be modified and distributed under the terms
   * of the MIT license.  See the LICENSE file for details.
   */

  // Another example of logging out within the child process
  var log = require('electron-log');
  log.transports.console.level = 'info';
  log.transports.file.level = 'info';

  var express = require('express');
  var router = express.Router();
  const path = require('path');

  /* GET home page. */
  router.get('/', function(req, res, next) {
      log.info('serving home page...');
      res.sendFile(path.join(__dirname + '/index.html'));
      // res.render('index', { title: 'Express' });
      // res.send("Hola este es el index.");
      // res.json({ "mensaje": "Hola este es el index." });
      // console.log("Index del console.");

  });

  module.exports = router;