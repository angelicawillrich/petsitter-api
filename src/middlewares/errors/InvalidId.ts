export class InvalidId extends Error {
    constructor() {
        super()
        this.name = 'InvalidId';
        this.message = 'O ID é inválido.';
    }
}