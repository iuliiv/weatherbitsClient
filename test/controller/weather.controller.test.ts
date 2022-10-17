import app from '../../src/app';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import WeatherController from '../../src/controller/weather.controller';
let should = chai.should();


chai.use(chaiHttp)


describe('Weather controller', () => {
    describe('/GET/weather', () => {
        it('it shouold GET all stored wether data', (done) => {
            chai.request(app).get('/weather')
                .set('Accept', 'applicaton/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    let response = [];
                    response = JSON.parse(res.text);
                    response.should.have.length.gte(3);
                    let firstEntity = response[0];
                    firstEntity.should.have.property('cityId');
                    firstEntity.should.have.property('temperature');
                    firstEntity.should.have.property('date');
                    res.text.should.not.contain('Error');
                    res.text.should.not.contain('invalid');
                    done();
                });

        });
    });
    describe('/GET/weather/city/:cityId', () => {
        it('it shouold GET latest stored wether data for city', (done) => {
            chai.request(app).get('/weather/' + 665087)
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
