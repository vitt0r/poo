import { Bike } from "./bike";
import { Crypt } from "./crypt";
import { Rent } from "./rent";
import { User } from "./user";
import { Location } from "./location";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    async registerUser(user: User): Promise<string> {
        if (this.users.some(u => u.email === user.email)) {
            throw new Error('Duplicate user.');
        }
        const newId = crypto.randomUUID();
        user.id = newId;
        const encryptedPassword = await this.crypt.encrypt(user.password);
        user.password = encryptedPassword;
        this.users.push(user);
        return newId;
    }
        //
    async authenticate(userEmail: string, password: string): Promise<boolean> {
        const user = this.findUser(userEmail);
        if (!user) {
            throw new Error('User not found.');
        }
        return await this.crypt.compare(password, user.password);
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID();
        bike.id = newId;
        this.bikes.push(bike);
        return newId;
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        } else {
            throw new Error('User does not exist.');
        }
    }
    
    rentBike(bikeId: string, userEmail: string): void {
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
        const newRent = new Rent(bike, user, new Date());
        this.rents.push(newRent);
    }

    returnBike(bikeId: string, userEmail: string): number {
        const now = new Date();
        const rent = this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end
        );
        if (!rent) {
            throw new Error('Rent not found.');
        }
        rent.end = now;
        rent.bike.available = true;
        const hours = this.diffHours(rent.end, rent.start);
        return hours * rent.bike.rate;
    }

    listUsers(): User[] {
        return this.users;
    }

    listBikes(): Bike[] {
        return this.bikes;
    }

    listRents(): Rent[] {
        return this.rents;
    }

    moveBikeTo(bikeId: string, location: Location): Bike {
        const bike = this.bikes.find(bike => bike.id === bikeId);
        if (bike) {
            bike.location.latitude = location.latitude;
            bike.location.longitude = location.longitude;
            return bike; 
        }
        throw new Error('Bike not found.');
    }
    

    checkBike(bikeId: string): Bike | undefined {
        return this.bikes.find(bike => bike.id === bikeId);
    }

    private diffHours(dt2: Date, dt1: Date): number {
        const diff = (dt2.getTime() - dt1.getTime()) / 1000;
        return Math.abs(diff / 3600);
    }
}
