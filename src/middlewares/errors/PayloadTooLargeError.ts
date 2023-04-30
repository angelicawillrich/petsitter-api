export class PayloadTooLargeError extends Error {
    constructor() {
        super()
        this.name = 'PayloadTooLargeError';
        this.message = 'O arquivo nao deve ser maior do que do 50MB.';
    }
}