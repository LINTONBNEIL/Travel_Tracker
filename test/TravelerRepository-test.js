import chai from 'chai';
const expect = chai.expect;
import { travelers } from './test-file.js'
import TravelerRepository from '../src/TravelerRepository.js';
import Traveler from '../src/TravelerRepository';


describe('TravelerRepository', () => {
  let traveler = null;
  let traveler2 = null;
  let traveler3 = null;
  let travelerRepo = null;
    beforeEach(() => {
      traveler = new Traveler(travelers[1]);
      travelerRepo = new TravelerRepository(travelers)
  });

  it('should be a function', () => {

    expect(TravelerRepository).to.be.a('function')
  });

  it('should hold travelers data', () => {

    expect(travelerRepo.travelerData).to.deep.equal(travelers);
  });

  it('should not hold the destinations', () => {

    expect(travelerRepo.travelerData).to.not.equal(destinations)
  });

  it('should not hold the trips', () => {

    expect(travelerRepo.travelerData).to.not.equal(trips)
  });

  it('should have a method to find travelers data by their id', () => {

    expect(travelerRepo.findTraveler(2)).to.deep.equal(traveler)
  });
});
