const { Router } = require('express');
const { getConsultas, getConsultaPorCodigo,
    addConsulta, updateConsulta, deleteConsulta
} = require('../controllers/consultaController');

const rotasConsultas = new Router();

rotasConsultas.route('/consulta')
    .get(getConsultas)
    .post(addConsulta)
    .put(updateConsulta);

rotasConsultas.route('/consulta/:codigo')
    .get(getConsultaPorCodigo)
    .delete(deleteConsulta);

module.exports = { rotasConsultas };