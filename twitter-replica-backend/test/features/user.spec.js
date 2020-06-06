const request = require('supertest');
const should = require('should/as-function');
const mongoose = require('mongoose');
const app = require('../../src/main');

const User = mongoose.model('User');
const agent = request.agent(app);
const fixtures = require('../fixtures/index');

const dummyUser = new User(fixtures.user.dummyUser);

describe('User routes test', async () => {
  after(async () => {
    process.exit(0);
  });

  describe('GET /user/:usernamePrefix', async () => {
    before(async () => {
      await dummyUser.save();
    });

    after(async () => {
      await User.deleteOne({ username: dummyUser.username });
    });

    it('Expect user to exist and have exactly 6 properties', async () => {
      agent
        .get('/api/user/dummyUsernamePrefix')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const propertyCount = Object.keys(res.body).length;
          should(propertyCount).be.exactly(6).and.be.a.Number();
        });
    });

    it('Expect to get a `does not exist` user', (done) => {
      agent
        .get('/api/user/unknownUser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /signup', async () => {
    after(async () => {
      await User.deleteOne({ username: dummyUser.username });
    });

    it('Expect to create a new default user', async () => {
      agent
        .post('/api/signup')
        .send({
          email: `${dummyUser.email}`,
          username: `${dummyUser.username}`,
          password: `${dummyUser.password}`,
        })
        .set('Accept', 'application/json')
        .expect(201);
    });

    it('Expect 500 if the user already exists', async () => {
      agent
        .post('/api/signup')
        .send({
          email: `${dummyUser.email}`,
          username: `${dummyUser.username}`,
          password: `${dummyUser.password}`,
        })
        .set('Accept', 'application/json')
        .expect(500);
    });
  });

  describe('POST /login', async () => {
    // before(async () => {
    //   await dummyUser.save();
    // });

    after(async () => {
      await User.deleteOne({ username: dummyUser.username });
    });

    it('Expect to authenticate a user', async () => {
      agent
        .post('/api/login')
        .send({
          username: `${dummyUser.username}`,
          password: `${dummyUser.password}`,
        })
        .set('Accept', 'application/json')
        .expect(200);
    });

    it('Expect to not find user for authentication', async () => {
      agent
        .post('/api/login')
        .send({
          username: `unknownUser`,
          password: `${dummyUser.password}`,
        })
        .set('Accept', 'application/json')
        .expect(500);
    });

    it('Expect user to have invalid credentials', async () => {
      agent
        .post('/api/login')
        .send({
          username: `${dummyUser.username}`,
          password: `unknownPassword`,
        })
        .set('Accept', 'application/json')
        .expect(500);
    });
  });
});
