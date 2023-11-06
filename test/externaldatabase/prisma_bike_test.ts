import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaBikeRepo', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('adds a bike in the database', async () => {
        const newBike = new Bike ('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(newBike)
        expect(bikeId).toBeDefined
        const testBike = await repo.find(bikeId)
        expect(testBike).toEqual(newBike)
    })

    it('removes a bike in the database', async () => {
        const newBike = new Bike ('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(newBike)
        await repo.remove(bikeId)
        const findBike = await repo.find(bikeId)
        expect(findBike).toBeNull
    })

    it('updates a bike in the database', async () => {
        const newBike = new Bike ('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const updatedBike = new Bike ('speed', 'road bike', 4, 100, 10, 'travel bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(newBike)
        await repo.update(bikeId, updatedBike)
        const testBike = await repo.find(bikeId)
        expect(testBike).toEqual(updatedBike)
    })

    it('lists bikes in the database', async () => {
        const newBike = new Bike ('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        const newBike2 = new Bike ('speed', 'road bike', 4, 100, 10, 'travel bike', 5, [])
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(newBike)
        const bikeId2 = await repo.add(newBike2)
        const listBikes = await repo.list
        expect(listBikes.length).toEqual(2)
    })
})