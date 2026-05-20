const { Router } = require('express');
const { login, cadastrar, getUsuario, updateUsuario } = require('../controllers/segurancaController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasSeguranca = new Router();

rotasSeguranca.route('/login').post(login);
rotasSeguranca.route('/cadastro').post(cadastrar);
rotasSeguranca.route('/usuario')
    .get(verificaJWT, getUsuario)
    .put(verificaJWT, updateUsuario);

module.exports = { rotasSeguranca };