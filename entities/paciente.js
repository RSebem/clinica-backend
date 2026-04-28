class Paciente {
    constructor(codigo, nome, cpf, data_nascimento, telefone, email) {
        this.codigo = codigo;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.telefone = telefone;
        this.email = email;
    }
}

module.exports = Paciente;