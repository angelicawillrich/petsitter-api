export class UserNotFound extends Error {
    constructor() {
        super()
        this.name = 'UserNotFound';
        this.message = 'Não foi possível encontrar o usuário!';
    }
}