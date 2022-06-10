import chai from 'chai';
const expect = chai.expect;
import { travelers } from './test-file.js'
import Traveler from '../src/Traveler.js';


describe('Traveler', () => {
  let traveler = null;
    beforeEach(() => {
      traveler = new Traveler(travelers[0]);
    })

  it('should be a function', function () {

    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function () {

    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should have a unique id', () => {

    expect(traveler.id).to.equal(1);
  });

  it('/s id should only be a number', () => {

    expect(traveler.id).to.not.be.a('string');
  });

  it('should have a name', () => {

    expect(traveler.name).to.equal('Ham Leadbeater')
  });

  it('/s name should always be a string', () => {

    expect(traveler.name).to.be.a('string');
  });

  it('should have a specific personality type', () => {

    expect(traveler.travelerType).to.equal('relaxer');
  });

  it('/s type should be a string', () => {

    expect(traveler.travelerType).to.be.a('string');
  });
});
