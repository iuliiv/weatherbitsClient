import app from '../../src/app';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import WeatherController from '../../src/controller/weather.controller';
let should = chai.should();


chai.use(chaiHttp)


describe('Statistics controller', () => {


    describe('/GET/stats', () => {
        it('it shouold GET average temperature for all stored data', (done) => {
            chai.request(app).get('/stats')
                .set('Accept', 'applicaton/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    let response = [];
                    response = JSON.parse(res.text);

                    response.should.have.property('temperature');
                    response.should.have.property('date');
                    response.should.have.property('cityId');
                    response.cityId.should.eq(0);
                    res.text.should.not.contain('Error');
                    res.text.should.not.contain('invalid');
                    done();
                });

        });
    });
    describe('/GET/stats/:cityId', () => {
        it('it shouold GET average temperature for city', (done) => {
            chai.request(app).get('/stats/' + 665087)
                .set('Accept', 'applicaton/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    let response = [];
                    response = JSON.parse(res.text);
                    response.should.have.property('cityId');
                    response.cityId.should.eq(665087);
                    response.should.have.property('temperature');
                    response.should.have.property('date');
                    res.text.should.not.contain('Error');
                    res.text.should.not.contain('invalid');
                    done();
                });

        });
    });

});
