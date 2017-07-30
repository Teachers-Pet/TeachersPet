'use strict';
let db = require('../models');
let bodyParser = require('body-parser');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

// our parent block
describe('/GET students', () => {
  it('it should GET all the students and have response length of 4', done => {
    chai
      .request('http://localhost:8080')
      .post('/api/teachers/students')
      .send({ email: 'jen@testteacher.com' })
      .then(function(res, body) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(4);
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});

// our parent block
describe('/GET students', () => {
  it('DB should contain seed data', done => {
    chai
      .request('http://localhost:8080')
      .post('/api/teachers/students')
      .send({ email: 'jen@testteacher.com' })
      .then(function(res, body) {
        expect(res.body[0]['Students.name']).to.include('Eyad Drakefan');
        expect(res).to.be.json;
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});

describe('/POST new students', () => {
  it('should successfully post a new student to the SQL database', done => {
    chai
      .request('http://localhost:8080')
      .post('/api/students')
      .send({
        firstName: 'Eyad',
        lastName: 'Qassem',
        email: 'example@gmail.com',
        imgUrl: 'http://saintheron.com/wp-content/uploads/2016/03/drake.jpg'
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});

describe('/POST new students', () => {
  it('should successfully return JSON dataType to client on post to SQL DB', done => {
    chai
      .request('http://localhost:8080')
      .post('/api/students')
      .send({
        firstName: 'Greatest',
        lastName: 'Ever',
        email: 'test@gmail.com',
        imgUrl: 'http://saintheron.com/wp-content/uploads/2016/03/drake.jpg'
      })
      .then(function(res) {
        expect(res).to.be.json;
        expect(res.body.email).to.include('test@gmail.com');
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});

// our parent block
describe('/GET assignments', () => {
  it('it should GET all students', done => {
    chai
      .request('http://localhost:8080')
      .get('/api/assignments')
      .then(function(res, body) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res).to.be.json;
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});

// our parent block
describe('/POST assignments', () => {
  it('it should POST a new assignment to the DB', done => {
    chai
      .request('http://localhost:8080')
      .post('/api/assignments')
      .send({ assignName: 'Technical Interview' })
      .then(function(res, body) {
        expect(res).to.have.status(200);
        expect(res.body.assignName).to.include('Technical Interview');
        expect(res).to.be.json;
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});
