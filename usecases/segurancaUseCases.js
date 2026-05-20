const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body;
        const results = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
            [email, senha]
        );
        if (results.rowCount === 0) {
            throw 'Usuário ou senha inválidos';
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw 'Erro ao autenticar o usuário: ' + err;
    }
};

const getUsuarioDB = async (email) => {
    try {
        const results = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1`, [email]
        );
        if (results.rowCount === 0) throw 'Usuário não encontrado';
        const u = results.rows[0];
        return new Usuario(u.email, u.tipo, u.telefone, u.nome);
    } catch (err) {
        throw 'Erro ao buscar usuário: ' + err;
    }
};

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, senha, telefone, nome } = body;
        const results = await pool.query(
            `INSERT INTO usuarios (email, senha, tipo, telefone, nome)
             VALUES ($1, $2, 'U', $3, $4) RETURNING *`,
            [email, senha, telefone, nome]
        );
        const u = results.rows[0];
        return new Usuario(u.email, u.tipo, u.telefone, u.nome);
    } catch (err) {
        throw 'Erro ao cadastrar usuário: ' + err;
    }
};

const updateUsuarioDB = async (body, emailLogado) => {
    try {
        const { telefone, nome, senha } = body;
        const results = await pool.query(
            `UPDATE usuarios SET telefone=$1, nome=$2, senha=$3
             WHERE email=$4 RETURNING *`,
            [telefone, nome, senha, emailLogado]
        );
        if (results.rowCount === 0) throw 'Usuário não encontrado';
        const u = results.rows[0];
        return new Usuario(u.email, u.tipo, u.telefone, u.nome);
    } catch (err) {
        throw 'Erro ao atualizar usuário: ' + err;
    }
};

module.exports = { autenticaUsuarioDB, getUsuarioDB, cadastraUsuarioDB, updateUsuarioDB };