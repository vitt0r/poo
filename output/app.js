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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    findUser(email) {
        return this.users.find(user => { return user.email === email; });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.some(rUser => { return rUser.email === user.email; })) {
                throw new Error('User with the same email already registered.');
            }
            yield user.setPassword(user.password); // Chame setPassword antes de adicionar o usuário
            const newId = crypto_1.default.randomUUID();
            user.id = newId;
            this.users.push(user);
            return newId;
        });
    }
    registerBike(bike) {
        const newId = crypto_1.default.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
        return newId;
    }
    rentBike(bikeId, userEmail, startDate, endDate) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (!bike) {
            throw new Error('Bike not found.');
        }
        const user = this.findUser(userEmail);
        if (!user) {
            throw new Error('User not found.');
        }
        const bikeRents = this.rents.filter(rent => rent.bike.id === bikeId && !rent.dateReturned);
        const newRent = rent_1.Rent.create(bikeRents, bike, user, startDate, endDate);
        this.rents.push(newRent);
    }
    removeUser(email) {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return;
        }
        throw new Error('User does not exist.');
    }
    returnBike(bikeId, userEmail) {
        const today = new Date();
        const rent = this.rents.find(rent => rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today);
        if (rent) {
            rent.dateReturned = today;
            return;
        }
        throw new Error('Rent not found.');
    }
    listUsers() {
        if (this.users.length === 0) {
            throw new Error("Nenhum usuário cadastrado");
        }
        return this.users;
    }
    listRent() {
        if (this.rents.length === 0) {
            throw new Error("Nenhum aluguel cadastrado");
        }
        return this.rents;
    }
    listBikes() {
        if (this.bikes.length === 0) {
            throw new Error("Nenhuma bike cadastrada");
        }
        return this.bikes;
    }
    authenticateUser(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.findUser(userEmail);
            if (user) {
                const passwordMatch = yield user.checkPassword(password);
                return passwordMatch;
            }
            return false;
        });
    }
}
exports.App = App;
