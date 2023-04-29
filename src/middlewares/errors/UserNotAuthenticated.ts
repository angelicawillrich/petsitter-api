export class UserNotAuthenticated extends Error {
    constructor() {
        super()
        this.name = 'UserNotAuthenticated';
        this.message = 'Usuário nao autenticado.';
    }
}