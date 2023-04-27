export class CastError extends Error {
    constructor() {
        super()
        this.name = 'CastError';
        this.message = 'ID inválido.';
    }
}