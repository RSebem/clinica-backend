const { Router } = require('express');
const { getPacientes, getPacientePorCodigo,
    addPaciente, updatePaciente, deletePaciente
} = require('../controllers/pacienteController');

const rotasPacientes = new Router();

rotasPacientes.route('/paciente')
    .get(getPacientes)
    .post(addPaciente)
    .put(updatePaciente);

rotasPacientes.route('/paciente/:codigo')
    .get(getPacientePorCodigo)
    .delete(deletePaciente);

module.exports = { rotasPacientes };