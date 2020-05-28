const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
});


describe('Users router', function() {
    describe('GET /', function() {
        it('should return JSON on success', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
        it('should return 500 on fail, no status on success', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).not.toBe(500)
                });
        });
    });
});
