export class TransactionFailed extends Error {
    constructor() {
        super()
        this.name = 'TransactionFailed';
        this.message = 'Não foi possível completar essa operação. Por favor, tente novamente.';
    }
}