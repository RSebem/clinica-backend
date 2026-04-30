const { Router } = require('express');
const { getConsultas, getConsultaPorCodigo,
    addConsulta, updateConsulta, deleteConsulta
} = require('../controllers/consultaController');

const rotasConsultas = new Router();

rotasConsultas.route('/consulta')
    .get(getConsultas)
    .post(addConsulta);

rotasConsultas.route('/consulta/:codigo')
    .get(getConsultaPorCodigo)
    .put(updateConsulta)
    .delete(deleteConsulta);

module.exports = { rotasConsultas };