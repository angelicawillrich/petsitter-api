export class EmailAlreadyExists extends Error {
    constructor() {
        super()
        this.name = 'EmailAlreadyExists';
        this.message = 'O nome de usuário já existe, por favor, escolha outro nome de usuário.';
    }
}