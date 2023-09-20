import sinon, { SinonSandbox } from "sinon";
import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";
import { Location } from "./location";

describe('App', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should correctly calculate the rent amount', async () => {
        const app = new App();
        const user = new User('Jose', 'jose@mail.com', '1234');
        await app.registerUser(user);

        // Registrar a bicicleta e obter o id
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []);
        const bikeId = app.registerBike(bike);

        const clock = sandbox.useFakeTimers();
        app.rentBike(bikeId, user.email);
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour);

        // Obter o preço do aluguel usando o id da bicicleta
        const rentAmount = app.returnBike(bikeId, user.email);
        expect(rentAmount).toEqual(200.0);
    });

    it('should be able to move a bike to a specific location', () => {
        const app = new App();
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, []);
    
        // Registrar a bicicleta e obter o id
        const bikeId = app.registerBike(bike);
    
        const newYork = new Location(40.753056, -73.983056);
        const movedBike = app.moveBikeTo(bikeId, newYork);
    
        // Verificar as propriedades da bicicleta após o movimento
        expect(movedBike).toBeDefined(); // Certifique-se de que a bicicleta exista
        expect(movedBike.location.latitude).toEqual(newYork.latitude);
        expect(movedBike.location.longitude).toEqual(newYork.longitude);
    });
    
    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App();
        const newYork = new Location(40.753056, -73.983056);
        expect(() => app.moveBikeTo("nonexistentId", newYork)).toThrowError('Bike not found.');
    });

    it('should throw an error if a bike is not registered', () => {
        const app = new App();
        expect(() => app.checkBike("nonexistentId")).toThrowError('Bike not found.');
    });
});
