export class PetSitterNotFound extends Error {
    constructor() {
        super()
        this.name = 'PetSitterNotFound';
        this.message = 'Nao foi possível encontrar este PetSitter.';
    }
}