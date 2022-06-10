import chai from 'chai';
const expect = chai.expect;
import { travelers } from './test-file.js'
import TravelerRepository from '../src/TravelerRepository.js';
import Traveler from '../src/Traveler.js';


describe('TravelerRepository', () => {
  let travelerRepo = null;
    beforeEach(() => {
      travelerRepo = new TravelerRepository(travelers)
  });

  it('should be a function', () => {

    expect(TravelerRepository).to.be.a('function');
  });

  it('should hold travelers data', () => {

    expect(travelerRepo.travelerData).to.deep.equal(travelers);
  });

  it('should have a method to find travelers data by their id', () => {

    expect(travelerRepo.findTraveler(2)).to.deep.equal(travelers[1])
  });
});
