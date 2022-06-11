class Trip {
  constructor(tripObj) {
    this.id = tripObj.id;
    this.userID = tripObj.userID;
    this.destination = tripObj.destinationID;
    this.travelers = tripObj.travelers;
    this.date = tripObj.date;
    this.duration = tripObj.duration;
    this.status = tripObj.status;
    this.activities = tripObj.suggestedActivities;
  }
}

export default Trip
