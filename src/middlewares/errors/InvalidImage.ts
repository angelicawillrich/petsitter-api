export class InvalidImage extends Error {
    constructor() {
        super()
        this.name = 'InvalidImage';
        this.message = 'Imagem inválida.';
    }
}