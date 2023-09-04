"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, dateFrom, dateTo, dateReturned) {
        this.bike = bike;
        this.user = user;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.dateReturned = dateReturned;
    }
    static create(rents, bike, user, startDate, endDate) {
        const canCreate = Rent.canRent(rents, startDate, endDate);
        if (canCreate)
            return new Rent(bike, user, startDate, endDate);
        throw new Error('Overlapping dates.');
    }
    static canRent(rents, startDate, endDate) {
        for (const rent of rents) {
            if (startDate <= rent.dateTo && endDate >= rent.dateFrom) {
                return false;
            }
        }
        return true;
    }
    toString() {
        return `Informações de aluguel:
        User: ${this.user.name} / ${this.user.email}
        Bike: ${this.bike.id} - ${this.bike.name}
        Start Date: ${this.dateFrom}
        End Date: ${this.dateTo}`;
    }
}
exports.Rent = Rent;
