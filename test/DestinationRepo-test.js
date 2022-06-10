import chai from 'chai';
const expect = chai.expect;
import { destinations } from './test-file.js'
import DestinationRepo from '../src/DestinationRepo.js'
import Destination from '../src/Destination.js'

describe('DestinationsRepo', () => {
  let destination = null;
  let destinationRepo = null;
    beforeEach(() => {
      destination = new Destination(destinations[0]);
      destinationRepo = new DestinationRepo(destinations);
    });

    it('should be a function', () => {

      expect(DestinationRepo).to.be.a('function')
    });

    it('should hold a destination data', () => {

      expect(destinationRepo.destinationData).to.deep.equal(destinations);
    });

    it('should not hold the trips', () => {

      expect(destination.destinationData).to.not.equal(trips)
    });

    it('should have a method to find the destination data by id', () => {

      expect(destinationRepo.findDestination(2).to.deep.equal(destination))
    });
});
