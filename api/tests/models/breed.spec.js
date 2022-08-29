const { Breed, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe('minHeight', () => {
      it('should throw an error if minHeight is greater than maxHeight', (done) => {
        Breed.create({
          name: "doggy",
          minHeight: 1,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        })
          .then(() => done(new Error('minimum height must be smaller than maximum height.')))
          .catch(() => done());
      });
      it('should work when minHeight is smaller than maxHeight', () => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        });
      });
    });

    describe('minWeight', () => {
      it('should throw an error if minWeight is greater than maxWeight', (done) => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 50,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        })
          .then(() => done(new Error('minimun weight must be smaller than maximum weight.')))
          .catch(() => done());
      });
      it('should work when minWeight is smaller than maxWeight', () => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        });
      });
    });

    describe('startLifeSpan', () => {
      it('should throw an error if startLifeSpan is greater than endLifeSpan', (done) => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 20,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        })
          .then(() => done(new Error('start life span must be smaller than end life span.')))
          .catch(() => done());
      });
      it('should work when startLifeSpan is smaller than endLifeSpan', () => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        });
      });
    });

    describe('image', () => {
      it('should throw an error if image is not an URL', (done) => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "hi"
        })
          .then(() => done(new Error('image must be an URL')))
          .catch(() => done());
      });
      it('should work when image is an URL', () => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        });
      });
    });

    describe('name', () => {
      it('should throw an error if name is not composed of letters', (done) => {
        Breed.create({
          name: "555",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        })
          .then(() => done(new Error('name must be composed of letters')))
          .catch(() => done());
      });
      it('should throw an error if name is empty', (done) => {
        Breed.create({
          name: "",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        })
          .then(() => done(new Error('name cannot be empty')))
          .catch(() => done());
      });
      it('should work when name is correctly', () => {
        Breed.create({
          name: "doggy",
          minHeight: 0.5,
          maxHeight: 0.6,
          minWeight: 5,
          maxWeight: 10,
          startLifeSpan: 12,
          endLifeSpan: 16,
          image: "https://olondriz.com/wpcontent/uploads/2020/04/ambar-perrito-1-1024x899.jpg"
        });
      });
    });
  });
});
