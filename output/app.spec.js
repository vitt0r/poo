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
const sinon_1 = __importDefault(require("sinon"));
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const location_1 = require("./location");
describe('App', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should correctly calculate the rent amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user = new user_1.User('Jose', 'jose@mail.com', '1234');
        yield app.registerUser(user);
        // Registrar a bicicleta e obter o id
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        const bikeId = app.registerBike(bike);
        const clock = sandbox.useFakeTimers();
        app.rentBike(bikeId, user.email);
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour);
        // Obter o preço do aluguel usando o id da bicicleta
        const rentAmount = app.returnBike(bikeId, user.email);
        expect(rentAmount).toEqual(200.0);
    }));
    it('should be able to move a bike to a specific location', () => {
        const app = new app_1.App();
        const bike = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        // Registrar a bicicleta e obter o id
        const bikeId = app.registerBike(bike);
        const newYork = new location_1.Location(40.753056, -73.983056);
        const movedBike = app.moveBikeTo(bikeId, newYork);
        // Verificar as propriedades da bicicleta após o movimento
        expect(movedBike).toBeDefined(); // Certifique-se de que a bicicleta exista
        expect(movedBike.location.latitude).toEqual(newYork.latitude);
        expect(movedBike.location.longitude).toEqual(newYork.longitude);
    });
    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new app_1.App();
        const newYork = new location_1.Location(40.753056, -73.983056);
        expect(() => app.moveBikeTo("nonexistentId", newYork)).toThrowError('Bike not found.');
    });
    it('should throw an error if a bike is not registered', () => {
        const app = new app_1.App();
        expect(() => app.checkBike("nonexistentId")).toThrowError('Bike not found.');
    });
});
