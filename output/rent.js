"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, start, valor, end) {
        this.bike = bike;
        this.user = user;
        this.start = start;
        this.valor = valor;
        this.end = end;
    }
    static create(bike, user, start) {
        return new Rent(bike, user, start);
    }
    valorTot(star, end) {
        return ((end.hour * 60 + end.minute) - (star.hour * 60 + star.minute)) * 0.3;
    }
}
exports.Rent = Rent;
