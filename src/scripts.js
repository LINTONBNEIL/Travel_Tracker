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
};

const findTravelerTrips = (tripsRepo) => {
  travelersTrips = tripsRepo.findAllTravelerTrip(randomTraveler.id)
  setTripsDestination()
  findPresentTrips(travelersTrips)
}

const setTripsDestination = () => {
  travelersTrips.forEach(trip => {
  let destinationObj = destinationRepo.findDestination(trip.destination);
  trip.destination = destinationObj;
});
}

const findPresentTrips = (travelersTrips) => {
return travelersTrips.find(trip => {
    if (trip.date > date) {
      console.log("present", trip)
    displayPresentTrips(travelersTrips)
    }
    // console.log('past', trip)
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
  let pastTripCard = ''
  travelersTrips.forEach(trip => {
    pastTripCard += `
    <article class="traveler-card">
    <h2>${trip.destination.name}</h2>
    <image class="picture" src=${trip.destination.image}></image>
      <ul>
        <li>Lodging Cost: ${trip.destination.lodgingCost}</li>
        <li>Flight Cost: ${trip.destination.flightCost}</li>
        <li>Date: ${trip.date}</li>
        <li>Duration: ${trip.duration}</li>
        <li>Travelers: ${trip.travelers}</li>
      </ul>
    </article>
    `
  })
  pastBox.innerHTML = pastTripCard
}

const displayPresentTrips = () => {
  let presentTripCard = ''
  travelersTrips.forEach(trip => {
    presentTripCard += `
    <article class="traveler-card">
    <h2>${trip.destination.name}</h2>
    <image class="picture" src=${trip.destination.image}></image>
      <ul>
        <li>Lodging Cost: ${trip.destination.lodgingCost}</li>
        <li>Flight Cost: ${trip.destination.flightCost}</li>
        <li>Date: ${trip.date}</li>
        <li>Duration: ${trip.duration}</li>
        <li>Travelers: ${trip.travelers}</li>
      </ul>
    </article>
    `
  })
  presentBox.innerHTML = presentTripCard
}
