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
let travelerAmount = document.querySelector('.traveler-amount')
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

let date = '2022/05/11';

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
  findYearlySpent(travelersTrips)
}

const setTripsDestination = () => {
  travelersTrips.forEach(trip => {
  let destinationObj = destinationRepo.findDestination(trip.destination);
  trip.destination = destinationObj;
  });
}

const findYearlySpent = (travelersTrips) => {
  let yearlySpent = 0;
  travelersTrips.forEach(trip => {
    if(trip.date.includes('2022')) {
      yearlySpent += parseInt(trip.destination.lodgingCost + trip.destination.flightCost)
      displayYearlySpent(yearlySpent)
    }
    displayYearlySpent(yearlySpent)
  })
}

const findPresentTrips = (travelersTrips) => {
return travelersTrips.find(trip => {
  if (trip.date > date) {
    console.log('upcoming', trip)
    displayUpcomingTrips(travelersTrips)
  } else if (trip.date === date) {
    console.log("present", trip)
    displayPresentTrips(travelersTrips)
  } else {
    console.log('past', trip)
    displayPastTrips(travelersTrips)
  }
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

const displayYearlySpent = (yearlySpent) => {
  if (yearlySpent > 0) {
    travelerAmount.innerHTML = `You spent, $${yearlySpent} dollars this year!`
  } else {
    travelerAmount.innerHTML = `What? $${yearlySpent} dollars on trips?`
  }
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

const displayUpcomingTrips = () => {
  let upcomingTripCard = ''
  travelersTrips.forEach(trip => {
    upcomingTripCard += `
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
  upcomingBox.innerHTML = upcomingTripCard
}
