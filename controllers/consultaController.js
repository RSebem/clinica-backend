const { getConsultasDB, getConsultaPorCodigoDB,
    addConsultaBD, updateConsultaBD, deleteConsultaBD
} = require('../usecases/consultaUseCases');

const getConsultas = async (req, res) => {
    await getConsultasDB()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const getConsultaPorCodigo = async (req, res) => {
    await getConsultaPorCodigoDB(req.params.codigo)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const addConsulta = async (req, res) => {
    await addConsultaBD(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Consulta criada', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const updateConsulta = async (req, res) => {
    await updateConsultaBD(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Consulta atualizada', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const deleteConsulta = async (req, res) => {
    await deleteConsultaBD(req.params.codigo)
        .then(data => res.status(200).json({ status: 'success', message: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

module.exports = { getConsultas, getConsultaPorCodigo, addConsulta, updateConsulta, deleteConsulta };