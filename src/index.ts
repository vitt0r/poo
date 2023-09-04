import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], '1');
const user = new User('Maria', 'maria@mail.com', '1234');
const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday);
const user2 = new User('Marta', 'marta@mail.com', '3123');
const bike2 = new Bike('caloi', 'caloi zero', 23, 300, 98.9, 'desc', 5, [], "2");

const app = new App();


app.addUser(user2);
const foundUser = app.findUser('marta@mail.com');
console.log(foundUser)
app.registraBike(bike2);

app.addUser(user)
app.registraBike(bike);
app.rentBike(bike, user2, today, twoDaysFromToday);
app.returnBike(bike,user2,today,tomorrow)
console.log(app)


