class TravelerRepository {
  constructor(travelerRepo) {
    this.travelerData = travelerRepo
  }

  findTraveler(id) {
    return this.travelerData.find(traveler => {
        return traveler.id === id
    })
  }
}




export default TravelerRepository
