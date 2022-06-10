import chai from 'chai';
const expect = chai.expect;
import { destinations } from './test-file.js'
import Destination from '../src/Destination.js'


describe('Destination', () => {
  let destination = null;
  beforeEach(() => {
    destiantion = new Destination(destination[0]);
  });

  it('should be a function', function () {

    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', function () {

    expect(destination).to.be.an.instanceof(Destination)
  });

  it('should have a unique id', () => {

    expect(destination.id).to.equal(1);
  });

  it('/s id should not be a string', () => {

    expect(destination.id).to.not.be.a('string');
  });

  it('should have a unique destination', () => {

    expect(destination.destination).to.equal("Lima, Peru")
  });

  it('/s destination should be a string', () => {

    expect(destination.destination).to.be.a('string')
  });

  it('should have an estimated cost per day', () => {

    expect(destination.estimatedLodgingCostPerDay).to.equal(70)
  });

  it('should not have a string for a lodging cost', () => {

    expect(destination.estimatedLodgingCostPerDay).to.not.be.a('string')
  })

  it('should have an estimated flight cost per person', () => {

    expect(destination.estimatedFlightCostPerPerson).to.equal(400)
  });

  it('/s flight cost per person', () => {

    expect(destination.estimatedFlightCostPerPerson).to.not.be.a('string')
  })
});
