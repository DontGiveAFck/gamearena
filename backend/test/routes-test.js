//const request = require('request')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const {expect} = chai
const app = require('../server')
const setCookie = require('set-cookie-parser')

var agent = chai.request.agent(app)
let token;

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

let token

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
          token = cookies[0].value
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.have.cookie('token')
          done()
       });
    })
  })

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
          expect(res).to.be.json;
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
          expect(res).to.be.json;
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
          expect(res).to.be.json;
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
          expect(res).to.be.json;
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
          expect(res).to.be.json;
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
          expect(res).to.be.json;
          done()
       });
    })
  })

  



  

  