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
const crypt_1 = require("./crypt");
const rent_1 = require("./rent");
const crypto_1 = __importDefault(require("crypto"));
class App {
    constructor() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
        this.crypt = new crypt_1.Crypt();
    }
    findUser(email) {
        return this.users.find(user => user.email === email);
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.some(u => u.email === user.email)) {
                throw new Error('Duplicate user.');
            }
            const newId = crypto_1.default.randomUUID();
            user.id = newId;
            const encryptedPassword = yield this.crypt.encrypt(user.password);
            user.password = encryptedPassword;
            this.users.push(user);
            return newId;
        });
    }
    authenticate(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.findUser(userEmail);
            if (!user) {
                throw new Error('User not found.');
            }
            return yield this.crypt.compare(password, user.password);
        });
    }
    registerBike(bike) {
        const newId = crypto_1.default.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
        return newId;
    }
    removeUser(email) {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
        else {
            throw new Error('User does not exist.');
        }
    }
    rentBike(bikeId, userEmail) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (!bike) {
            throw new Error('Bike not found.');
        }
        if (!bike.available) {
            throw new Error('Unavailable bike.');
        }
        const user = this.findUser(userEmail);
        if (!user) {
            throw new Error('User not found.');
        }
        bike.available = false;
        const newRent = new rent_1.Rent(bike, user, new Date());
        this.rents.push(newRent);
    }
    returnBike(bikeId, userEmail) {
        const now = new Date();
        const rent = this.rents.find(rent => rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end);
        if (!rent) {
            throw new Error('Rent not found.');
        }
        rent.end = now;
        rent.bike.available = true;
        const hours = this.diffHours(rent.end, rent.start);
        return hours * rent.bike.rate;
    }
    listUsers() {
        return this.users;
    }
    listBikes() {
        return this.bikes;
    }
    listRents() {
        return this.rents;
    }
    moveBikeTo(bikeId, location) {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (bike) {
            bike.location.latitude = location.latitude;
            bike.location.longitude = location.longitude;
            return bike;
        }
        throw new Error('Bike not found.');
    }
    checkBike(bikeId) {
        return this.bikes.find(bike => bike.id === bikeId);
    }
    diffHours(dt2, dt1) {
        const diff = (dt2.getTime() - dt1.getTime()) / 1000;
        return Math.abs(diff / 3600);
    }
}
exports.App = App;
