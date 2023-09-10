import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto";
import * as bcrypt from 'bcrypt';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email })
    }
    async registerUser(user: User): Promise<string> {
        if (this.users.some(rUser => { return rUser.email === user.email })) {
            throw new Error('User with the same email already registered.')
        }
        await user.setPassword(user.password); // Chame setPassword antes de adicionar o usuário
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user);
        return newId
    }
    
    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }


    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }



    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }



    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    listUsers(): User[] {
        if(this.users.length === 0){
            throw new Error("Nenhum usuário cadastrado")
        }
        return this.users;
    }

    listRent(): Rent[]{
        if(this.rents.length === 0){
            throw new Error("Nenhum aluguel cadastrado")
        }
        return this.rents;
    }

    listBikes(): Bike[]{
        if(this.bikes.length === 0){
            throw new Error("Nenhuma bike cadastrada")
        }
        return this.bikes;
    }

    async authenticateUser(userEmail: string, password: string): Promise<boolean> {
        const user = this.findUser(userEmail);
        if (user) {
            const passwordMatch = await user.checkPassword(password);
            return passwordMatch;
        }
        return false;
    }


}