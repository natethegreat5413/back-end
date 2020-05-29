const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
});

const plantId = 1
const badId = NaN

describe('plants router', () => {
    describe('Plants GET /plants', () => {
        it('Returns status 200 and a JSON', () => {
            return request(server).get('/plants').then(res => {
                expect(res.status).toBe(200)
                expect(res.type).toMatch(/json/i)
                
            })
        })
    })
    describe('Plants POST /plants', () => {
        it('Returns status 200', async () => {
            const res = await request(server).post('/plants').send({
                user_id: 1,
                nickname: "test",
                species: "test",
                h2o_frequency: 5
            })
            expect(res.status).toBe(201)
        })
        it('Returns status 500 with missing info', async () => {
            const res = await request(server).post('/plants').send({
                nickname: "test",
                species: "test",
                h2o_frequency: 5
            })
            expect(res.status).toBe(500)
        })
    })
    describe('Plants find by id /:id', () => {
        it('Returns JSON with success', () => {
            return request(server).get(`/plants/${plantId}`).then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
        it('Returns 404 without proper id', () => {
            return request(server).get(`/plants/${badId}`).then(res => {
                expect(res.status).toBe(404)
            })
        })
    })
    describe('Plant PUT updates by id', () => {
        it('Returns JSON with success', async () => {
            const res =  await request(server).put(`/plants/${plantId}`).send({
                nickname: 'Other test'
            })
            expect(res.type).toMatch(/json/i)
        })
        it('Returns 404 without proper id', async () => {
            const res =  await request(server).put(`/plants/${badId}`).send({
                nickname: 'Other test'
            })
            expect(res.status).toBe(404)
        })
    })
    describe('Plant DELETE by id', () => {
        it('Returns JSON with success', async () => {
            const res = await request(server).delete(`/plants/${plantId}`)
            expect(res.type).toMatch(/json/i)
        })
        it('Returns 404 without proper id', async () => {
            const res = await request(server).delete(`/plant/${badId}`)
            expect(res.status).toBe(404)
        })
    })
})
