import chai from 'chai';
const expect = chai.expect;
import { destinations } from './test-file.js'
import Destination from '../src/Destination.js'


describe('Destination', () => {
  let destination = null;
  beforeEach(() => {
    destination = new Destination(destinations[0]);
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

    expect(destination.name).to.equal("Lima, Peru")
  });

  it('/s destination should be a string', () => {

    expect(destination.name).to.be.a('string')
  });

  it('should have an estimated cost per day', () => {

    expect(destination.lodgingCost).to.equal(70)
  });

  it('should not have a string for a lodging cost', () => {

    expect(destination.lodgingCost).to.not.be.a('string')
  })

  it('should have an estimated flight cost per person', () => {

    expect(destination.flightCost).to.equal(400)
  });

  it('/s flight cost per person', () => {

    expect(destination.flightCost).to.not.be.a('string')
  })

  it('should have an image', () => {

    expect(destination.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
  });

  it('should have an alt', () => {

    expect(destination.alt).to.equal('overview of city buildings with a clear sky');
  });
});
