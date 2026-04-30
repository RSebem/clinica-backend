const { getPacientesDB, getPacientePorCodigoDB,
    addPacienteBD, updatePacienteBD, deletePacienteBD
} = require('../usecases/pacienteUseCases');

const getPacientes = async (req, res) => {
    await getPacientesDB()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const getPacientePorCodigo = async (req, res) => {
    await getPacientePorCodigoDB(req.params.codigo)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const addPaciente = async (req, res) => {
    await addPacienteBD(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Paciente criado', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const updatePaciente = async (req, res) => {
    const objeto = { ...req.body, codigo: req.params.codigo };
    await updatePacienteBD(objeto)
        .then(data => res.status(200).json({ status: 'success', message: 'Paciente atualizado', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const deletePaciente = async (req, res) => {
    await deletePacienteBD(req.params.codigo)
        .then(data => res.status(200).json({ status: 'success', message: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

module.exports = { getPacientes, getPacientePorCodigo, addPaciente, updatePaciente, deletePaciente };