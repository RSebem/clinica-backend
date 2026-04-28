const { pool } = require('../config');
const Dentista = require('../entities/dentista');

const getDentistasDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM dentista ORDER BY nome');
        return rows.map(d => new Dentista(d.codigo, d.nome, d.especialidade, d.cro, d.telefone));
    } catch (err) {
        throw 'Erro ao consultar dentistas: ' + err;
    }
};

const getDentistaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query('SELECT * FROM dentista WHERE codigo = $1', [codigo]);
        if (results.rowCount === 0) throw `Nenhum dentista encontrado com o código ${codigo}`;
        const d = results.rows[0];
        return new Dentista(d.codigo, d.nome, d.especialidade, d.cro, d.telefone);
    } catch (err) {
        throw 'Erro ao recuperar dentista: ' + err;
    }
};

const addDentistaBD = async (body) => {
    try {
        const { nome, especialidade, cro, telefone } = body;
        const results = await pool.query(
            `INSERT INTO dentista (nome, especialidade, cro, telefone)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [nome, especialidade, cro, telefone]
        );
        const d = results.rows[0];
        return new Dentista(d.codigo, d.nome, d.especialidade, d.cro, d.telefone);
    } catch (err) {
        throw 'Erro ao inserir dentista: ' + err;
    }
};

const updateDentistaBD = async (body) => {
    try {
        const { codigo, nome, especialidade, cro, telefone } = body;
        const results = await pool.query(
            `UPDATE dentista SET nome=$1, especialidade=$2, cro=$3, telefone=$4
             WHERE codigo=$5 RETURNING *`,
            [nome, especialidade, cro, telefone, codigo]
        );
        if (results.rowCount === 0) throw `Nenhum dentista encontrado com o código ${codigo}`;
        const d = results.rows[0];
        return new Dentista(d.codigo, d.nome, d.especialidade, d.cro, d.telefone);
    } catch (err) {
        throw 'Erro ao alterar dentista: ' + err;
    }
};

const deleteDentistaBD = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM dentista WHERE codigo=$1', [codigo]);
        if (results.rowCount === 0) throw `Nenhum dentista encontrado com o código ${codigo}`;
        return 'Dentista removido com sucesso';
    } catch (err) {
        throw 'Erro ao remover dentista: ' + err;
    }
};

module.exports = { getDentistasDB, getDentistaPorCodigoDB, addDentistaBD, updateDentistaBD, deleteDentistaBD };