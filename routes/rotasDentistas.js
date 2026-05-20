const { Router } = require('express');
const { getDentistas, getDentistaPorCodigo,
    addDentista, updateDentista, deleteDentista
} = require('../controllers/dentistaController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasDentistas = new Router();

rotasDentistas.route('/dentista')
    .get(verificaJWT, getDentistas)
    .post(verificaJWT, addDentista);

rotasDentistas.route('/dentista/:codigo')
    .get(verificaJWT, getDentistaPorCodigo)
    .put(verificaJWT, updateDentista)
    .delete(verificaJWT, deleteDentista);

module.exports = { rotasDentistas };