import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser( email: string): User | undefined{
        return this.users.find(user =>{ return user.email === email})
    }

    addUser(user: User): void {
        if (this.users.some(rUser => { return rUser.email === user.email })) {
            throw new Error('User with same email already registered.')
        }
        this.users.push(user)
    }

    registraBike(bike: Bike): void{
        bike.id = crypto.randomUUID()
        if (this.bikes.some(renBike => {return renBike.id === bike.id})){
            throw new Error('Bike com o mesmo ID foi registrada.')
        }
        this.bikes.push(bike)
    }

   rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
    const rentss = this.rents.filter((bikess) => bikess.bike === bike);
    const newRent = Rent.create(rentss, bike, user, startDate, endDate);
    this.rents.push(newRent);
    return newRent; 
}

    

    removeUser(user: User): void {
        this.users = this.users.filter(existingUser => existingUser !== user);
    }
    

    returnBike(bike: Bike, user: User, startDate: Date, returnDate: Date): void{
        var i = 0
        for(i ; i < this.rents.length; i++){
            if(this.rents[i].bike === bike && this.rents[i].user === user && this.rents[i].dateFrom === startDate){
                this.rents[i].dateReturned = returnDate
            }
        }

    }
    
    
    
}