const { pool } = require('../config');
const Paciente = require('../entities/paciente');

const getPacientesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM paciente ORDER BY nome');
        return rows.map(p => new Paciente(
            p.codigo, p.nome, p.cpf,
            p.data_nascimento ? p.data_nascimento.toISOString().split('T')[0] : null,
            p.telefone, p.email
        ));
    } catch (err) {
        throw 'Erro ao consultar pacientes: ' + err;
    }
};

const getPacientePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query('SELECT * FROM paciente WHERE codigo=$1', [codigo]);
        if (results.rowCount === 0) throw `Nenhum paciente encontrado com o código ${codigo}`;
        const p = results.rows[0];
        return new Paciente(
            p.codigo, p.nome, p.cpf,
            p.data_nascimento ? p.data_nascimento.toISOString().split('T')[0] : null,
            p.telefone, p.email
        );
    } catch (err) {
        throw 'Erro ao recuperar paciente: ' + err;
    }
};

const addPacienteBD = async (body) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email } = body;
        const results = await pool.query(
            `INSERT INTO paciente (nome, cpf, data_nascimento, telefone, email)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nome, cpf, data_nascimento, telefone, email]
        );
        const p = results.rows[0];
        return new Paciente(
            p.codigo, p.nome, p.cpf,
            p.data_nascimento ? p.data_nascimento.toISOString().split('T')[0] : null,
            p.telefone, p.email
        );
    } catch (err) {
        throw 'Erro ao inserir paciente: ' + err;
    }
};

const updatePacienteBD = async (body) => {
    try {
        const { codigo, nome, cpf, data_nascimento, telefone, email } = body;
        const results = await pool.query(
            `UPDATE paciente SET nome=$1, cpf=$2, data_nascimento=$3, telefone=$4, email=$5
             WHERE codigo=$6 RETURNING *`,
            [nome, cpf, data_nascimento, telefone, email, codigo]
        );
        if (results.rowCount === 0) throw `Nenhum paciente encontrado com o código ${codigo}`;
        const p = results.rows[0];
        return new Paciente(
            p.codigo, p.nome, p.cpf,
            p.data_nascimento ? p.data_nascimento.toISOString().split('T')[0] : null,
            p.telefone, p.email
        );
    } catch (err) {
        throw 'Erro ao alterar paciente: ' + err;
    }
};

const deletePacienteBD = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM paciente WHERE codigo=$1', [codigo]);
        if (results.rowCount === 0) throw `Nenhum paciente encontrado com o código ${codigo}`;
        return 'Paciente removido com sucesso';
    } catch (err) {
        throw 'Erro ao remover paciente: ' + err;
    }
};

module.exports = { getPacientesDB, getPacientePorCodigoDB, addPacienteBD, updatePacienteBD, deletePacienteBD };