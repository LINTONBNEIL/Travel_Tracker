class DestinationRepo {
  constructor(destinationArray ) {
    this.destinationData = destinationArray;
  }
  findDestination(id) {
    return this.destinationData.find(destination => {
      if (destination.id === id) {
        return destination
      }
    })
  }
}




export default DestinationRepo
