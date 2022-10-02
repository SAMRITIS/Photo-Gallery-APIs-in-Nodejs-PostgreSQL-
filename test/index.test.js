let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);
const fs = require('fs')



// File Get API Test Case

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


// Upload File API Test Case

describe('/Post Images', () => {
    it('Upload images', (done) => {
        chai.request(server)
            .post('/api/v1/images')
            .attach('file', fs.readFileSync(__dirname + "/Screenshot (60).png"), 'Screenshot (60).png')
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an.instanceOf(Object).and.have.property('status', true);
                res.body.should.be.an.instanceOf(Object).and.have.property('message', 'Successfully Uploaded');
                done();
            });
    });
});