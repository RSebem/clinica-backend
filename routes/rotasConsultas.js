const { Router } = require('express');
const { getConsultas, getConsultaPorCodigo,
    addConsulta, updateConsulta, deleteConsulta
} = require('../controllers/consultaController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasConsultas = new Router();

rotasConsultas.route('/consulta')
    .get(verificaJWT, getConsultas)
    .post(verificaJWT, addConsulta);

rotasConsultas.route('/consulta/:codigo')
    .get(verificaJWT, getConsultaPorCodigo)
    .put(verificaJWT, updateConsulta)
    .delete(verificaJWT, deleteConsulta);

module.exports = { rotasConsultas };