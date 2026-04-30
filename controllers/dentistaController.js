const { getDentistasDB, getDentistaPorCodigoDB,
    addDentistaBD, updateDentistaBD, deleteDentistaBD
} = require('../usecases/dentistaUseCases');

const getDentistas = async (req, res) => {
    await getDentistasDB()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const getDentistaPorCodigo = async (req, res) => {
    await getDentistaPorCodigoDB(req.params.codigo)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const addDentista = async (req, res) => {
    await addDentistaBD(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Dentista criado', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const updateDentista = async (req, res) => {
    const objeto = { ...req.body, codigo: req.params.codigo };
    await updateDentistaBD(objeto)
        .then(data => res.status(200).json({ status: 'success', message: 'Dentista atualizado', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const deleteDentista = async (req, res) => {
    await deleteDentistaBD(req.params.codigo)
        .then(data => res.status(200).json({ status: 'success', message: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

module.exports = { getDentistas, getDentistaPorCodigo, addDentista, updateDentista, deleteDentista };