"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
class Bike {
    constructor(valor, id, cliente, status, tempo) {
        this.id = id;
        this.cliente = cliente;
        this.valor = valor;
        this.status = status;
        this.tempo = tempo;
    }
    pagar(status) {
        this.status = status;
    }
    renovar(valor, cliente, tempo) {
        this.valor += valor;
        this.cliente = cliente;
        this.tempo += tempo;
        if (this.status = 'pago') {
            this.valor = valor;
            this.status = 'pendente';
        }
    }
    trocar(id) {
        this.id = id;
    }
}
exports.Bike = Bike;
