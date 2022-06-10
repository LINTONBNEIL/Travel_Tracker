import chai from 'chai';
const expect = chai.expect;
import { trips } from './test-file.js';
import { travelers } from './test-file.js';
import { destinations } from './test-file.js'
import Destination from '../src/Destination.js'
import Traveler from '../src/Traveler.js'
import Trips from '../src/Trips.js'

describe('Trips', () => {
  let tripsRepo = null;
    beforeEach(() => {
      tripsRepo = new Trips(trips)
    });

    it('should be a function', () => {

      expect(Trips).to.be.a('function');
    });

    it('should hold trips data', () => {

      expect(tripsRepo.tripsData).to.deep.equal(trips);
    });

    it('should be able to find a specific trip by id', () => {

      expect(tripsRepo.findTrip(1)).to.equal(trips[0]);
    });


    it('should be able to find all trips by a traveler id', () => {

      expect(tripsRepo.findAllTravelerTrip(1)).to.deep.equal([trips[0]])
    })

    it('should be able to find all trips by a destination', () => {

      expect(tripsRepo.findAllTripDestination(1)).to.deep.equal([trips[0]])
    })
});
