export class EmailAlreadyExists extends Error {
    constructor() {
        super()
        this.name = 'EmailAlreadyExists';
        this.message = 'Este email já foi regitrado.';
    }
}