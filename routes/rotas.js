const { Router } = require('express');
const { rotasDentistas } = require('./rotasDentistas');
const { rotasPacientes } = require('./rotasPacientes');
const { rotasConsultas } = require('./rotasConsultas');

const rotas = new Router();

rotas.use(rotasDentistas);
rotas.use(rotasPacientes);
rotas.use(rotasConsultas);

module.exports = rotas;