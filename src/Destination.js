class Destination {
  constructor(destinationObj) {
    this.id = destinationObj.id;
    this.name = destinationObj.destination;
    this.lodgingCost = destinationObj.estimatedLodgingCostPerDay;
    this.flightCost = destinationObj.estimatedFlightCostPerPerson;
    this.image = destinationObj.image;
    this.alt = destinationObj.alt
  }
}


export default Destination;
