'use strict';

import {chai, app, getToken, config} from '../../test/common';

const tokenMock = getToken({ username: config.users[0].name });
/**
 * @test {authMiddleware}
 */
describe('Auth middleware', () => {
    it('should return success message!', async() => {
        const response = await chai.request(app)
            .get('/api/auth/check')
            .set('x-access-token', tokenMock)
            .set('Accept', 'application/json');
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.be.eql({
            success: true,
            username: config.users[0].name
        });
    });
    it('should return 400 when token do not set', async() => {
        const response = await chai.request(app)
            .get('/api/auth/check')
            .set('Accept', 'application/json');
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.be.eql({
            success: false,
            message: 'No token provided.'
        });
    });
    it('should return 401 when token wrong', async() => {
        const tokenWrong = 'tokenWrong';
        const response = await chai.request(app)
            .get('/api/auth/check')
            .set('x-access-token', tokenWrong)
            .set('Accept', 'application/json');
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.be.eql({
            success: false,
            message: 'Token is not valid'
        });
    });
    it('should return 401 when user does not exist', async() => {
      const tokenMock = getToken({ username: 'notExistedUser' });
      const response = await chai.request(app)
          .get('/api/auth/check')
          .set('x-access-token', tokenMock)
          .set('Accept', 'application/json');
      response.should.have.status(401);
      response.body.should.be.a('object');
      response.body.should.be.eql({
          success: false,
          message: 'User does not exist'
      });
  });
});

describe('Auth user post /auth ', () => {
  it('should return token', async() => {
      const response = await chai.request(app)
          .post('/api/auth')
          .send({
            'username': config.users[0].name,
            'password': config.users[0].password
          })
          .set('Accept', 'application/json');
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('success');
      response.body.success.should.be.equal(true);
      response.body.should.have.property('token');
  });
  it('should return status 400 if username or password not send', async() => {
    const response = await chai.request(app)
        .post('/api/auth')
        .set('Accept', 'application/json');
    response.should.have.status(400);
    response.body.should.be.a('object');
    response.body.should.be.eql({
        success: false,
        message: 'Username and password are required.'
    });
  });
  it('should return status 401 if authentification is wrong', async() => {
    const response = await chai.request(app)
        .post('/api/auth')
        .send({
          'username': 'wronguser',
          'password': 'wrongpasssword'
        })
        .set('Accept', 'application/json');
    response.should.have.status(401);
    response.body.should.be.a('object');
    response.body.should.be.eql({
        success: false,
        message: 'Incorrect username or password'
    });
  });     
});
