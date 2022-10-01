let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
describe('/GET Images', () => {
    it('it should GET all the images', (done) => {
        chai.request(server)
            .get('/api/v1/images')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an.instanceOf(Object).and.have.property('status', true);
                res.body.should.be.an.instanceOf(Object).to.have.nested.property("result[0].id");
                res.body.should.be.an.instanceOf(Object).to.have.nested.property("result[0].name");
                res.body.should.be.an.instanceOf(Object).to.have.nested.property("result[0].uploadDate");
                done();
            });
    });
});
