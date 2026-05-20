const { Router } = require('express');
const { getPacientes, getPacientePorCodigo,
    addPaciente, updatePaciente, deletePaciente
} = require('../controllers/pacienteController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasPacientes = new Router();

rotasPacientes.route('/paciente')
    .get(verificaJWT, getPacientes)
    .post(verificaJWT, addPaciente);

rotasPacientes.route('/paciente/:codigo')
    .get(verificaJWT, getPacientePorCodigo)
    .put(verificaJWT, updatePaciente)
    .delete(verificaJWT, deletePaciente);
module.exports = { rotasPacientes };