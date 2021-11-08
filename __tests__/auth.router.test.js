'use strict';

const { server } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const { sequelize } = require('../src/auth/models/index');
const base64 = require('base-64')
const mockRequest = supertest(server);


beforeAll(async () => {
    await sequelize.sync()
});

afterAll(async () => {
    await sequelize.drop()
});

describe('auth test', () => {
    test('signup to create a new user', async () => {
        const respons = await mockRequest.post('/signup').send({
            username: "essam",
            password: "1234"
        });
        expect(respons.status).toBe(201)
    });
    it('signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth("essam", "1234");
        expect(response.status).toEqual(200);
    });
    it('send the basic header', async () => {
        const user = await mockRequest.post('/signup').send({
            username: "admin",
            password: "admin"
        });
        const respons = await mockRequest.post('/signin').send({
            username: "admin",
            password: "admin"
        }).auth(user.body.username,'admin')
        expect(respons.status).toBe(200)

    });
});