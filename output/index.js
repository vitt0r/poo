"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const app = new app_1.App();
function registerAndPrintUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bike = new bike_1.Bike('caloi mountain', 'mountain bike', 100, 200, 150.5, 'My bike', 5, []);
            const bikeId = app.registerBike(bike);
            // Registrar um usuário com senha criptografada
            const user = new user_1.User('Jose', 'jose@mail.com', '1234');
            const user1 = new user_1.User('Pedro', 'pedro@mail.com', 'senha');
            yield app.registerUser(user);
            yield app.registerUser(user1);
            const email = 'pedro@mail.com';
            const password = 'senha';
            // Autenticar o usuário
            const isAuthenticated = yield app.authenticateUser(email, password);
            if (isAuthenticated) {
                console.log('Usuário autenticado com sucesso.');
            }
            else {
                console.log('Credenciais inválidas. Autenticação falhou.');
            }
            // Listar os usuários
            const users = app.listUsers();
            console.log('List of users:', users);
            // Realizar um aluguel de bicicleta
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const today = new Date();
            yield app.rentBike(bikeId, user.email, yesterday, today);
            yield app.returnBike(bikeId, user.email);
            // Listar os aluguéis
            const rents = app.listRent();
            console.log('List of rents:', rents);
            // Listar as bicicletas
            const bikes = app.listBikes();
            console.log('Lista de bicicletas:', bikes);
        }
        catch (error) {
            console.error('deu ruim:', error);
        }
    });
}
registerAndPrintUsers();
