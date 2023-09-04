import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

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
        if (this.bikes.some(renBike => {return renBike.id === bike.id})){
            throw new Error('Bike com o mesmo ID foi registrada.')
        }
        this.bikes.push(bike)
    }

   rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
    const rentss = this.rents.filter((bikess) => bikess.bike === bike);
    const newRent = Rent.create(rentss, bike, user, startDate, endDate);
    this.rents.push(newRent);
    return newRent; // Retorna o objeto de aluguel criado
}

    

    removeUser(user: User): void {
        this.users = this.users.filter(existingUser => existingUser !== user);
    }
    

    returnBike(rentToReturn: Rent, returnDate: Date): Rent {
        const foundRent = this.rents.find(rent => rent === rentToReturn);
    
        if (foundRent) {
            foundRent.dateReturned = returnDate;
            return foundRent; // Retorna o aluguel com a data de retorno atualizada
        } else {
            throw new Error('Aluguel não encontrado.');
        }
    }
    
    
    
}