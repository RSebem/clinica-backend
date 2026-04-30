const { Router } = require('express');
const { getDentistas, getDentistaPorCodigo,
    addDentista, updateDentista, deleteDentista
} = require('../controllers/dentistaController');

const rotasDentistas = new Router();

rotasDentistas.route('/dentista')
    .get(getDentistas)
    .post(addDentista);

rotasDentistas.route('/dentista/:codigo')
    .get(getDentistaPorCodigo)
    .put(updateDentista)
    .delete(deleteDentista);

module.exports = { rotasDentistas };