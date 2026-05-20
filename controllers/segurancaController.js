const {
    autenticaUsuarioDB, getUsuarioDB,
    cadastraUsuarioDB, updateUsuarioDB
} = require('../usecases/segurancaUseCases');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    await autenticaUsuarioDB(req.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 3600 // expira em 1 hora
            });
            return res.json({ auth: true, token: token });
        })
        .catch(err => res.status(401).json({ auth: false, message: '' + err }));
};

const cadastrar = async (req, res) => {
    await cadastraUsuarioDB(req.body)
        .then(data => res.status(200).json({ status: 'success', message: 'Usuário cadastrado!', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const getUsuario = async (req, res) => {
    await getUsuarioDB(req.usuario.email)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

const updateUsuario = async (req, res) => {
    await updateUsuarioDB(req.body, req.usuario.email)
        .then(data => res.status(200).json({ status: 'success', message: 'Usuário atualizado!', objeto: data }))
        .catch(err => res.status(400).json({ status: 'error', message: '' + err }));
};

function verificaJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(401).json({ auth: false, message: 'Token inválido.' });
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = { login, cadastrar, getUsuario, updateUsuario, verificaJWT };