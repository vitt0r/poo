import { BikeRepo } from "../../ports/bike-repo";
import { Bike } from "../../bike";
import prisma from "./db"

export class PrismaBikeRepo implements BikeRepo {

    async find(id: string): Promise<Bike> {
        return await prisma.bike.findFirst({
            where: { id }
        })
    }

    async add(bike: Bike): Promise<string> {
        const AddedBike = await prisma.bike.create({
            data: { ...bike }
        })
        return AddedBike.id
    }

    async remove(id: string): Promise<void> {
        await prisma.bike.delete({
            where: { id }
        })
    }

    async list(): Promise<Bike[]> {
        return await prisma.bike.findMany({})
    }

    async update(id: string, bike: Bike): Promise<void> {
        const UpdateBike = await prisma.bike.update({
            where: { id },
            data: { ...bike }
        })
    }
}