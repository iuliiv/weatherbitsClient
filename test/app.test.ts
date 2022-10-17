import app from '../src/app';
import chaiHttp from 'chai-http';
import chai from 'chai';

let should = chai.should();

chai.use(chaiHttp);

describe('App', () => {
    describe('/GET swagger', () => {
        it('should return swagger ', (done) => {
            chai.request(app).get('/docs').end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.be.gt(1);
                res.text.should.contain('<title>Swagger UI</title>');
                done();
            });
        })
    });


});