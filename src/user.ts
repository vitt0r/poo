import * as bcrypt from 'bcrypt';

export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string
    ) {}

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10; // Você pode ajustar o número de salt rounds conforme necessário
        this.password = await bcrypt.hash(password, saltRounds);
    }

    async checkPassword(inputPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, this.password);
    }
}
