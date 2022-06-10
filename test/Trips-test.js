import chai from 'chai';
const expect = chai.expect;
import { trips } from './test-file.js';
import { travelers } from './test-file.js';
import { destinations } from './test-file.js'
import Destination from '../src/Destination.js'
import Traveler from '../src/Traveler.js'
import Trips from '../src/Trips.js'

describe('Trips', () => {
  let traveler = null;
  let destination = null;
  let trips = null;
  let trip = null;
    beforeEach(() => {
      traveler = new Traveler(travelers[0])
      destination = new Destination(destinations[0])
      trips = new Trips(trips)
      trip = new Trips(trips[0])
    });

    it('should be a function', () => {

      expect(Trips).to.be.a('function');
    });

    it('should hold trips data', () => {

      expect(trips.tripsData).to.deep.equal(trips);
    });

    it('should be able to find a specific trip by id', () => {

      expect(trips.findTrip(1)).to.equal(trip);
    });

    it('should be able to find all trips by traveler id', () => {

      expect(trips.findTripByTraveler(1)).to.equal(trip);
    });

    it('should be able to find trip by destination id', () => {

      expect(trips.findTripByDestination(1).to.equal(trips));
    });
});
