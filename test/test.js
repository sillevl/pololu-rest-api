var request = require('supertest');
describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../server');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /', function(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });

  it('responds to /api/drive with post', function(done) {
  request(server)
    .post('/api/drive')
    .set('Accept', 'application/json')
    .send({speed: 35, id: '123456789abcdef'})
    .expect(202, done);
  });

  it('responds to /api/turn with post', function(done) {
  request(server)
    .post('/api/turn')
    .set('Accept', 'application/json')
    .send({turnspeed: 35, id: '123456789abcdef'})
    .expect(202, done);
  });

  it('responds to /api/stop with post', function(done) {
  request(server)
    .post('/api/stop')
    .set('Accept', 'application/json')
    .send({stop: true, id: '123456789abcdef'})
    .expect(202, done);
  });

  it('responds to /api/calibrate with post', function(done) {
  request(server)
    .post('/api/calibrate')
    .set('Accept', 'application/json')
    .send({calibrate: true, id: '123456789abcdef'})
    .expect(202, done);
  });


});
