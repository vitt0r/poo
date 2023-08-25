import { Bike } from "./aluguel"
import { Cliente } from "./cliente"

const Joao = new Cliente('João', '487.674.099-70')
const bikeJoao = new Bike(10, '53', Joao, 'pendente', 40)
console.log(bikeJoao)

bikeJoao.renovar(10, Joao, 20)
console.log(bikeJoao)

bikeJoao.trocar('43')
console.log(bikeJoao)

bikeJoao.pagar('pago')
console.log(bikeJoao)

bikeJoao.renovar(10, Joao, 10)
console.log(bikeJoao)