class TripsRepo {
  constructor(tripsObject) {
    this.tripsData = tripsObject
  }
  findTrip(id) {
  return this.tripsData.find(trip => {
      return trip.id === id
    })
  }

  findAllTravelerTrip(id) {
    return this.tripsData.filter(trip => {
      return trip.userID === id
    })
  }

  findAllTripDestination(id) {
    return this.tripsData.filter(trip => {
      return trip.destinationID === id
    })
  }
}

export default TripsRepo;
