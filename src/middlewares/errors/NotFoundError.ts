export class NotFoundError extends Error {
    constructor() {
        super()
        this.name = 'NotFoundError';
        this.message = 'Nao foi possível encontrar.';
    }
}