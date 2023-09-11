import { Bike } from "./bike";
import { Time } from "./time";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public start: Time,
        public valor?: number,
        public end?: Time
    ) { }

    static create(bike: Bike, user: User,start: Time): Rent {
            return new Rent(bike, user, start);
    }

    valorTot(star: Time, end: Time){
        return ((end.hour*60 + end.minute) - (star.hour* 60 + star.minute))*0.3
    }
}