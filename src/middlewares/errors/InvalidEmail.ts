export class InvalidEmail extends Error {
    constructor() {
        super()
        this.name = 'InvalidEmail';
        this.message = 'Email inválido.';
    }
}