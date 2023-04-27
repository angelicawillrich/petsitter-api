export class WrongCredentials extends Error {
    constructor() {
        super()
        this.name = 'WrongCredentials';
        this.message = 'Nome de usuário e/ou senha incorretos.';
    }
}