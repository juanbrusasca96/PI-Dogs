/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const breed = {
  name: "doggy",
  minHeight: 0.5,
  maxHeight: 0.6,
  minWeight: 5,
  maxWeight: 10,
  startLifeSpan: 12,
  endLifeSpan: 16,
  image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
};

const temperaments = [
  { name: "docile" },
  { name: "aggressive" }
]


describe('Routes GET', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(breed)));
  describe('GET /dogs', () => {
    it('should get 200', async () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs/name', () => {
    it('should get 200 if tne name query is contains in name attribute', async () =>
      agent.get('/dogs/name?name=dog').expect(200)
    );
  });
  describe('GET /dogs/:idRaza', () => {
    it('should get 200 in get with idRaza', async () =>
    {
      const res = await agent.post('/dogs').send({...breed, name:'dog'});
     await agent.get(`/dogs/${res.body.id}`).expect(200);
    }
    );
  });
  describe('GET /temperaments', () => {
    it('should get 200', () =>
      agent.get('/temperaments').expect(200)
    );
  });
});

describe('Routes POST', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Breed.sync({ force: true }));
  describe('POST /dogs', () => {
    it('should get 200', async () => {
      const res = await agent.post('/dogs').send(breed);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.eql({ id: res.body.id, ...breed })
    }
    );
  });
  describe('POST /temperaments', () => {
    it('should get 200', async () => {
      const res = await agent.post('/temperaments').send({ names: temperaments });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.eql([{ id: 1, name: 'docile' }, { id: 2, name: 'aggressive' }])
    }
    );
  });
});

describe('Routes PUT', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => {
      Temperament.bulkCreate(temperaments)
    }));
  describe('PUT /dogs', () => {
    it('should get 200', async () => {
      const res = await agent.post('/dogs').send(breed);
      const res2 = await agent.put('/dogs').send({ codeBreed: res.body.id, codeTemperaments: [1, 2] });
      expect(res2.statusCode).to.equal(200);
    }
    );
  });
});
