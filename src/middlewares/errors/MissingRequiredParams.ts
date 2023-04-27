export class MissingRequiredParams extends Error {
    constructor() {
        super()
        this.name = 'MissingRequiredParams';
        this.message = 'Faltam parâmetros obrigatórios.';
    }
}