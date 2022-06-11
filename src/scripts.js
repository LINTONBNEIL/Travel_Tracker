// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//----IMPORTS----
import './images/turing-logo.png'

import './css/styles.css';
import { allData } from './apiCalls.js'
import Destination from '../src/Destination.js'
import DestinationRepo from '../src/DestinationRepo.js'
import Traveler from '../src/Traveler.js'
import TravelerRepository from '../src/TravelerRepository.js';
import TripsRepo from '../src/TripsRepo.js'
import Trip from '../src/Trip.js'

//----QUERY SELECTORS----
let travelerName = document.querySelector('.traveler-greeting');
// let tripCard = document.querySelector('.traveler-card');
let presentBox = document.querySelector('.Present');
let upcomingBox = document.querySelector('.Upcoming');
let pendingBox = document.querySelector('.Pending');
let pastBox = document.querySelector('.Past');



//----GLOBAL VARIABLES----
let travelerData = [];
let destinationData = [];
let tripsData = [];
let randomTraveler;
let travelerArray;
let travelerRepo;
let tripsArray;
let tripsRepo;
let destinationsArray;
let destinationRepo;
let travelersTrips

let date = '2022/5/11';

//----EVENT LISTENERS----
window.addEventListener('load', () => {
  allData.then(data => {
  travelerData = data[0].travelers
  destinationData = data[1].destinations
  tripsData = data[2].trips
  initialSetup(travelerData, destinationData, tripsData)
  }).catch(error => console.log(error))
});

//----DATA FUNCTIONS----

const initialSetup = (travelers, destinations, trips) => {
  createTraveler(travelers)
  createDestinations(destinations)
  createTrips(trips)
};

const createTraveler = (travelerData) => {
travelerArray = travelerData.map(traveler => new Traveler(traveler));
travelerRepo = new TravelerRepository(travelerArray)
randomTraveler = getRandomUser(travelerRepo.travelerData)
displayTravelerInfo(randomTraveler)
};

const createDestinations = (destinationData) => {
  destinationsArray = destinationData.map(destination => new Destination(destination));
  destinationRepo = new DestinationRepo(destinationsArray)
};

const createTrips = (tripData) => {
  tripsArray = tripsData.map(trip => new Trip(trip));
  tripsRepo = new TripsRepo(tripsArray)
  findTravelerTrips(tripsRepo)
  setTripsDestination()
};

const findTravelerTrips = (tripsRepo) => {
  travelersTrips = tripsRepo.findAllTravelerTrip(randomTraveler.id)
  findPresentTrips(travelersTrips)
}

const setTripsDestination = () => {
  travelersTrips.forEach(trip => {
  let destinationObj = destinationRepo.findDestination(trip.destinationID);
  trip.destinationID = destinationObj;
});
}

const findPresentTrips = (travelersTrips) => {
return travelersTrips.find(trip => {
  console.log("past", trip)
    if (trip.date > date) {
      console.log("trip", trip)
    }
    displayPastTrips(travelersTrips)
  })
}

const getRandomUser = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
};

//----DOM FUNCTIONS----
const displayTravelerInfo = (randomTraveler) => {
  travelerName.innerHTML = `Welcome, ${randomTraveler.name}`
}

const displayPastTrips = (travelersTrips) => {
  travelersTrips.forEach(trip => {
    pastBox.innerHTML += `
    <div class="traveler-card">
      <image class="picture">Destination Picture</image>
      <p>Destination Name</p>
      <p>Destination Cost lodging/flight</p>
      <p>${trip.date}</p>
      <p>${trip.duration}</p>
      <p>${trip.travelers}</p>
    </div>
    `
  })
}
