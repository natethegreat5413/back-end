const supertest = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');

afterEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
    
});

describe('server', () => {
    test('can run tests', () => {
        expect(true).toBeTruthy();
    });

    describe("GET /users", () => {
        test('should return http status code 200', () => {
            return (
                supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.status).not.toBe(404);
                })
            );
        });
    });

    describe("POST /auth/register", () => {
        test('registering returns 201 Created', () => {
            let user1 = {
                "username": "user1",
                "email": "user1@email.com",
                "password": "pw1!"
            }
            return (
                supertest(server)
                .post('/auth/register')
                .send(user1)
                .expect(201)
            )
        });

        test('missing email returns 400 Bad Request error', () => {
            let user2 = {
                "username": "user2",
                "email": "",
                "password:": "pw2!"
            }
            return (
                supertest(server)
                .post('/auth/register')
                .send(user2)
                .expect(400)
            )
        })
    })

    describe("GET /plants", () => {
        test('should return http status code 200', () => {
            return (
                supertest(server)
                .get('/plants')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.status).not.toBe(404);
                })
            );
        });
    });






})