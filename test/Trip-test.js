import chai from 'chai';
const expect = chai.expect;
import { trips } from './test-file.js';
import { travelers } from './test-file.js';
import { destinations } from './test-file.js';
import Destination from '../src/Destination.js';
import Traveler from '../src/Traveler.js'
import TripsRepo from '../src/TripsRepo.js'
import Trip from '../src/Trip.js'


describe('Trip', () => {
  let trip = null;
  beforeEach(() => {
    trip = new Trip(trips[0])
  });

  it('should be a function', () => {

    expect(Trip).to.be.a('function');
  });

  it('should have a specific id', () => {

    expect(trip.id).to.equal(1);
  });

  it('should have a user id', () => {

    expect(trip.userID).to.equal(1);
  });

  it('should have a destination id', () => {

    expect(trip.destinationID).to.equal(1);
  });

  it('should have a total amount of travelers', () => {

    expect(trip.travelers).to.equal(1);
  });

  it('should have a date', () => {

    expect(trip.date).to.equal("2022/09/16");
  });

  it('should have a duration', () => {

    expect(trip.duration).to.equal(8);
  });

  it('should have a status of approval/pending/rejected', () => {

    expect(trip.status).to.equal('approved');
  });

  it('should have an array of suggested activities', () => {

    expect(trip.activities).to.deep.equal([]);
  });
});
