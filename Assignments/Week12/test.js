var request = require('supertest');
var chai = require('chai');
var app = require('./server');

var expect = chai.expect;

describe('API Tests', function() {
  
  it('should have return server is running', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('should give 404 error on users creation', function() {
    request(app)
      .post('/users')
      .end(function(err, res){
        expect(res.body.errors).to.be.an('array');
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });

  it('should give 200 on user creation', function() {
    request(app)
      .post('/users')
      .send({ user: {
        "name": "test",
        "email": "test@test.com"
      }})
      .end(function(err, res){
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
    
  it('should return user if the user exist with userId', function() {
    request(app)
    .get('/users/1')
    .end(function(err, res){
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).not.to.be('');
      done();
    });
  });

  it('should return 400 if the user does not exist with userID', function() {
    request(app)
    .get('/users/100')
    .end(function(err, res){
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
