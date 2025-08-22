const request = require('supertest');
const { expect } = require('chai');
const postTopics = require('./fixtures/postTopics.json');
require('dotenv').config();

describe('Topics', () => {
    describe('POST /topics', () => {
        it('Should return 201 along with the newly created topic', async () => {
            const bodyTopics = { ...postTopics};
            const response = await request('http://localhost:3000')
            .post('/topics')
            .set('Content-Type', 'application/json')
            .send(bodyTopics);
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal(bodyTopics.name);
            expect(response.body.notes).to.equal(bodyTopics.notes);
        });
    });

    describe('GET /topics', () => {
       it('Should return 200 along with the list of all topics', async () => {
            const response = await request('http://localhost:3000')
            .get('/topics')
            .set('Content-Type', 'application/json')           
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[3]).to.have.property('id');
            expect(response.body[3]).to.have.property('name');
        }); 
    });

});