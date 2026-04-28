const { pool } = require('../config');
const Consulta = require('../entities/consulta');

const getConsultasDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT c.*, d.nome AS dentista_nome, p.nome AS paciente_nome
            FROM consulta c
            JOIN dentista d ON c.dentista = d.codigo
            JOIN paciente p ON c.paciente = p.codigo
            ORDER BY c.data_hora DESC
        `);
        return rows.map(c => new Consulta(
            c.codigo, c.data_hora, c.status, c.observacao,
            c.dentista, c.paciente, c.dentista_nome, c.paciente_nome
        ));
    } catch (err) {
        throw 'Erro ao consultar consultas: ' + err;
    }
};

const getConsultaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query('SELECT * FROM consulta WHERE codigo=$1', [codigo]);
        if (results.rowCount === 0) throw `Nenhuma consulta encontrada com o código ${codigo}`;
        const c = results.rows[0];
        return new Consulta(c.codigo, c.data_hora, c.status, c.observacao, c.dentista, c.paciente, '', '');
    } catch (err) {
        throw 'Erro ao recuperar consulta: ' + err;
    }
};

const addConsultaBD = async (body) => {
    try {
        const { data_hora, status, observacao, dentista, paciente } = body;
        const results = await pool.query(
            `INSERT INTO consulta (data_hora, status, observacao, dentista, paciente)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data_hora, status || 'agendada', observacao, dentista, paciente]
        );
        const c = results.rows[0];
        return new Consulta(c.codigo, c.data_hora, c.status, c.observacao, c.dentista, c.paciente, '', '');
    } catch (err) {
        throw 'Erro ao inserir consulta: ' + err;
    }
};

const updateConsultaBD = async (body) => {
    try {
        const { codigo, data_hora, status, observacao, dentista, paciente } = body;
        const results = await pool.query(
            `UPDATE consulta SET data_hora=$1, status=$2, observacao=$3, dentista=$4, paciente=$5
             WHERE codigo=$6 RETURNING *`,
            [data_hora, status, observacao, dentista, paciente, codigo]
        );
        if (results.rowCount === 0) throw `Nenhuma consulta encontrada com o código ${codigo}`;
        const c = results.rows[0];
        return new Consulta(c.codigo, c.data_hora, c.status, c.observacao, c.dentista, c.paciente, '', '');
    } catch (err) {
        throw 'Erro ao alterar consulta: ' + err;
    }
};

const deleteConsultaBD = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM consulta WHERE codigo=$1', [codigo]);
        if (results.rowCount === 0) throw `Nenhuma consulta encontrada com o código ${codigo}`;
        return 'Consulta removida com sucesso';
    } catch (err) {
        throw 'Erro ao remover consulta: ' + err;
    }
};

module.exports = { getConsultasDB, getConsultaPorCodigoDB, addConsultaBD, updateConsultaBD, deleteConsultaBD };