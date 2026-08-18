const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Note = require('../models/Note');

chai.use(chaiHttp);
const { expect } = chai;

describe('Notes API', () => {
  let token = '';
  let noteId = '';

  before(done => {
    chai.request(server)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '1234' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should create a new note', done => {
    chai.request(server)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Note', content: 'Hello world' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        noteId = res.body._id;
        done();
      });
  });

  it('should get user notes', done => {
    chai.request(server)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should delete a note', done => {
    chai.request(server)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('Note deleted');
        done();
      });
  });
});
