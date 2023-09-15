export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public locBike?:string,
        public id?: string
    ) {}

    updateLocBike(newLocBike: string) {
        this.locBike = newLocBike;
    }
}