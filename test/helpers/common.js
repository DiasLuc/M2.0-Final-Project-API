const { expect } = require('chai');
const { get } = require('http');
const request = require('supertest');

const getFirstTopic = () => {
    const res = async () => {
            const response = await request('http://localhost:3000')
            .get('/topics')
            .set('Content-Type', 'application/json')           
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[3]).to.have.property('id');
            expect(response.body[3]).to.have.property('name');
        }; 
    
    console.log(res);
}

module.exports = {
    getFirstTopic
}