class Consulta {
    constructor(codigo, data_hora, status, observacao, dentista, paciente, dentista_nome, paciente_nome) {
        this.codigo = codigo;
        this.data_hora = data_hora;
        this.status = status;
        this.observacao = observacao;
        this.dentista = dentista;
        this.paciente = paciente;
        this.dentista_nome = dentista_nome;
        this.paciente_nome = paciente_nome;
    }
}

module.exports = Consulta;