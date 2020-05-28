const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
});

describe('Auth router', () => {
    describe('POST /register', () => {
        it('Returns a status of 201 and a json on success', async () => {
            const res = await request(server).post('/auth/register').send({
                username: "testuser",
                email: "testemail@test.com",
                password: "password"
            })
            expect(res.status).toBe(201)
            expect(res.type).toMatch(/json/i)
        });
        it('Returns a 404 with invalid credentials', async () => {
            const res = await request(server).post('/auth/register').send({
                username: '',
                email: '',
                password: ''
            })
            expect(res.status).toBe(400)
        })
    });
    describe('POST /login', () => {
        it('Returns a status of 500 and a json with incorrect credentials', async () => {
            const res = await request(server).post('/auth/login').send({
                username: "testuser",
                password: "password"
            })
            expect(res.status).toBe(500)
            expect(res.type).toMatch(/json/i)
        });
        it('Returns a 400 with invalid credentials', async () => {
            const res = await request(server).post('/auth/login').send({
                username: '',
                password: ''
            })
            expect(res.status).toBe(400)
        })
    });

});
