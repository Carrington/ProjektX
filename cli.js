#!/usr/bin/env node
'use strict';
var meow = require('meow');
var projektx = require('./');

var cli = meow({
  help: [
    'Usage',
    '  projektx <input>',
    '',
    'Example',
    '  projektx Unicorn'
  ].join('\n')
});

projektx(cli.input[0]);
