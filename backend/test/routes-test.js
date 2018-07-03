//const request = require('request')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const {expect} = chai
const app = require('../server')
const setCookie = require('set-cookie-parser')
const jwt = require('jsonwebtoken')

const agent = chai.request.agent(app)
var userId;

const testUser = {
    login: 'userLogin',
    password: 'userPassword',
    email: 'user@test.com',
    username: 'userUsername'
}
const testAdmin = {
    login: 'adminLogin',
    password: 'adminPassword',
    email: 'admin@test.ru',
    username: 'adminUsername'
}
const testGame = {
    title: 'testTitle',
    description: 'testDescription', 
    type: 'testGametype'
}


// routes/other.js
describe('POST: Sign up route: /signup', () => {
    it('Should return 200 OK', (done) => {
      chai
        .request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(testAdmin)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
       });
    })

    it('Should return 200 OK', (done) => {
      chai
        .request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(testUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
       });
    })
    
    it('Should return 400 Bad request', (done) => {
      chai
        .request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(testUser)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
       });
    }) 
  })

  describe('POST: Sign in route: /signin', () => {
    it('Should return 200 OK', (done) => {
      agent
        .post('/signin')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(testAdmin)
        .end(function (err, res) {
          var cookies = setCookie.parse(res, {
            decodeValues: true
          })
          let token = cookies[0].value;
          let decoded = jwt.decode(token, {complete: true});
          userId = decoded.payload.id

          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.cookie('token')
          done()
       });
    })
  })

// routes/admin.js
  describe('POST: Make me admin route: /makemeadmin', () => {
    it('Should return 200 OK', (done) => {
      agent
        .post('/makemeadmin')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
       });
    })
  })

  describe('GET: get all users route: /admin/users', () => {
    it('Should return 200 OK', (done) => {
      agent
        .get('/admin/user')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
       });
    })
  })

  describe('POST: add gametype: /admin/gametype', () => {
    it('Should return 200 OK', (done) => {
      agent
        .post('/admin/gametype')
        .send(testGame)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
       });
    })
  })

  describe('POST: add game: /admin/game', () => {
    it('Should return 200 OK', (done) => {
      agent
        .put('/admin/game')
        .send(testGame)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
       });
    })

    it('Should return 400 Bad request', (done) => {
      agent
        .put('/admin/game')
        .send(testGame)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res).to.be.json
          done()
       });
    })
  })

  describe('GET: get gametypes: /admin/gametype', () => {
    it('Should return 200 OK', (done) => {
      agent
        .get('/admin/gametype')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
       });
    })
  })

  describe('PUT: add game to account by accountId: /admin/account/game', () => {
    it('Should return 200 OK', (done) => {
      agent
        .put('/admin/account/game')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({accountid: 1, userid: 1})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
       });
    })
  })

describe('DELETE: delete game from account by accountId: /admin/account/game', () => {
    it('Should return 200 OK', (done) => {
        agent
            .delete('/admin/account/game')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({accountid: 1, userid: 1})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json
                done()
            });
    })
})

const testNewBalance = {
    userid: userId,
    newbalance: '100'
}
describe('PUT: set account balance by userid: /admin/account/setbalance', () => {
    it('Should return 200 OK', (done) => {
        agent
            .put('/admin/account/setbalance')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({userid: 1, newbalance: 100})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res).to.be.json
                done()
            });
    })
})










  

  