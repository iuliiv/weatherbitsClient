import app from '../../src/app';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { errorCodes } from '../../src/errors/errorStatusCode';


let should = chai.should();


describe('Test  middleware', () => {
    describe('/GET/weather/:cityId', () => {
        it('it shouold send error status for invalid cityId', (done) => {
            chai.request(app).get('/weather/INVALID_CITY_ID')
                .set('Accept', 'applicaton/json')
                .end((err, res) => {
                    res.should.have.status(errorCodes.VALIDATION_ERROR);
                    res.body.should.be.a('object');
                    let response = [];
                    res.text.should.not.contain('Invalid');
                    done();
                });
        });
    })
    describe('/GET/stats/:cityId', () => {
        it('it shouold send error status for invalid cityId', (done) => {
            chai.request(app).get('/stats/INVALID_CITY_ID')
                .set('Accept', 'applicaton/json')
                .end((err, res) => {
                    res.should.have.status(errorCodes.VALIDATION_ERROR);
                    res.body.should.be.a('object');
                    let response = [];
                    res.text.should.not.contain('Invalid');
                    done();
                });
        });
    })
});