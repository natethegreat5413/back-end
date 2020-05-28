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

        test('returns an empty array of users', () => {
            return (
                supertest(server)
                .get('/users')
                .then(res => {
                    expect(res.body).toHaveLength(0);
                })
            )
        })
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

    describe('POST /auth/login', () => {
        let user3 = {
            "username": "person3",
            "password": "pw3!",
        }
        test('returns error code 500 when user doesnt exist in database', () => {
           return (
               supertest(server)
               .post('/auth/login')
               .send(user3)
               .expect(500)
           )
        });
        let user4 = {
            "username":  '',
            "password": "pw4!",
        }
        test('returns error code 400 when user field is empty', () => {
           return (
               supertest(server)
               .post('/auth/login')
               .send(user4)
               .expect(400)
           )
        });
    });

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
        test('returns an empty array of plants', () => {
            return (
                supertest(server)
                .get('/plants')
                .then(res => {
                    expect(res.body).toHaveLength(0);
                })
            )
        })
    });

    describe("POST /plants", () => {
        test('having all fields creates a new plant', () => {
            let plant1 = {
                "user_id": 12,
                "nickname": "Franklin",
                "species": "Pirahna Plant",
                "h2o_frequency": 5
            }
            return (
                supertest(server)
                .post('/plants')
                .send(plant1)
                .expect(201)
            )
        });
        test('throws error when missing required field', () => {
            let plant2 = {
                "user_id": 12,
                "species": "SADD Planta",
                "h2o_frequency": 2
            }
            return (
                supertest(server)
                .post('/plants')
                .send(plant2)
                .expect(500)
            )
         });
    });

    describe("DELETE /plants/:id", () => {
        test('delete plant that has a valid id',() => {
            let plant3 = {
                "id": 45,
                "user_id": 3,
                "nickname": "Trump",
                "species": "Mango plant",
                "h2o_frequency": 1,
                "image_url": null,
                "isWatered": null
            }
            return (
                supertest(server)
                .delete('/plants/45')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                    expect(res.status).not.toBe(420)
                })
            )
        })
        test('fails to delete a plant that doesnt match id, returns 404 missing error ', () => {
            let plant7 = {
                "id": 7,
                "user_id": 7,
                "nickname": "Jesus",
                "species": "Burning Bush",
                "h2o_frequency": 7,
                "image_url": null,
                "isWatered": null
            }
            return (
                supertest(server)
                .delete('/plants/13')
                .then(res => {
                    expect(res.status).toBe(404)
                    expect(res.status).not.toBe(420)
                })
            )
        })
     });
    describe("PUT /plants/:id", () => {
        test('delete plant that has a valid id',() => {
            let plant5 = {
                "id": 1,
                "user_id": 3,
                "nickname": "im out of puns",
                "species": "sad face emoji",
                "h2o_frequency": 1,
                "image_url": null,
                "isWatered": null
            }
            return (
                supertest(server)
                .put('/plants/1')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                    expect(res.status).not.toBe(420)
                })
            )
        })
        test('fails to edit plant that doesnt match id, returns 404 missing error ', () => {
            let plant2 = {
                "id": 9,
                "user_id": 4,
                "nickname": "fin",
                "species": "ished",
                "h2o_frequency": 3,
                "image_url": null,
                "isWatered": null
            }
            return (
                supertest(server)
                .put('/plants/420')
                .then(res => {
                    expect(res.status).toBe(404)
                    expect(res.status).not.toBe(420)
                })
            )
        })
    });

});





