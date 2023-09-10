import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App()
async function registerAndPrintUsers() {
    try {
        const bike = new Bike('caloi mountain', 'mountain bike', 100, 200, 150.5, 'My bike', 5, []);
        const bikeId = app.registerBike(bike);

        // Registrar um usuário com senha criptografada
        const user = new User('Jose', 'jose@mail.com', '1234')
        const user1 = new User('Pedro', 'pedro@mail.com', 'senha')
        await app.registerUser(user)
        await app.registerUser(user1)

        const email = 'pedro@mail.com';
        const password = 'senha';

        // Autenticar o usuário
        const isAuthenticated = await app.authenticateUser(email, password)
        if (isAuthenticated) {
            console.log('Usuário autenticado com sucesso.')
        } else {
            console.log('Credenciais inválidas. Autenticação falhou.')
        }
        // Listar os usuários
        const users = app.listUsers()
        console.log('List of users:', users)

        // Realizar um aluguel de bicicleta
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        const today = new Date()
        await app.rentBike(bikeId, user.email, yesterday, today)
        await app.returnBike(bikeId, user.email)

        // Listar os aluguéis
        const rents = app.listRent()
        console.log('List of rents:', rents)


        // Listar as bicicletas
        const bikes = app.listBikes()
        console.log('Lista de bicicletas:', bikes)

    } catch (error) {
        console.error('deu ruim:', error)
    }
}

registerAndPrintUsers();

