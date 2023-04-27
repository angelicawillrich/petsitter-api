export class ValidationError extends Error {
    constructor() {
        super()
        this.name = 'ValidationError';
        this.message = 'Erro ao validar dados.';
    }
}