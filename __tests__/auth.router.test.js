'use strict';

const { server } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/server');



describe('auth test', () => {
    test('signup to create a new user', async () => {
        const response = await mockRequest.post('/signup').send({
            username: "essam",
            password: "1234"
        });
        expect(response.status).toBe(201);
    });
    it('signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth("essam", "1234");
        expect(response.status).toBe(200);
    });

    it('signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth("essam", "1234");
        expect(response.status).toBe(200);
    });
    describe(' Middleware', () => {
        it('send the basic header', async () => {
            await mockServer.post('/signup').send({
                username: 'essam',
                password: '1234'
            });
            const response = await mockServer.post('/signin').set({
                Authorization: `Basic ${base64.encode('essam:1234')}`
            });

            expect(response.status).toEqual(200);
        });
    });
    it('doesn\'t auth if the password is wrong', async () => {
        let response = await mockServer.post('/signin').set({
            Authorization: `Basic ${base64.encode('essam:12345')}`
        });
        expect(response.status).toEqual(500);
    });




});