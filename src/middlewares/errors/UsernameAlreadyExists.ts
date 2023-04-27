export class UsernameAlreadyExists extends Error {
    constructor() {
        super()
        this.name = 'UsernameAlreadyExists';
        this.message = 'O nome de usuário já existe, por favor, escolha outro nome de usuário.';
    }
}