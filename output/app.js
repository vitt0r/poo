"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    findUser(email) {
        return this.users.find(user => { return user.email === email; });
    }
    addUser(user) {
        if (this.users.some(rUser => { return rUser.email === user.email; })) {
            throw new Error('User with same email already registered.');
        }
        this.users.push(user);
    }
    registraBike(bike) {
        if (this.bikes.some(renBike => { return renBike.id === bike.id; })) {
            throw new Error('Bike com o mesmo ID foi registrada.');
        }
        this.bikes.push(bike);
    }
    rentBike(bike, user, startDate, endDate) {
        const rentss = this.rents.filter((bikess) => bikess.bike === bike);
        const newRent = rent_1.Rent.create(rentss, bike, user, startDate, endDate);
        this.rents.push(newRent);
        return newRent; // Retorna o objeto de aluguel criado
    }
    removeUser(user) {
        this.users = this.users.filter(existingUser => existingUser !== user);
    }
    returnBike(bike, user, startDate, returnDate) {
        var i = 0;
        for (i; i < this.rents.length; i++) {
            if (this.rents[i].bike === bike && this.rents[i].user === user && this.rents[i].dateFrom === startDate) {
                this.rents[i].dateReturned = returnDate;
            }
        }
    }
}
exports.App = App;
