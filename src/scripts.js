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
let travelerName = document.querySelector('.traveler-greeting')


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

//----EVENT LISTENERS----
window.addEventListener('load', loadData);

//----DOM FUNCTIONS----

//----DATA FUNCTIONS----
function loadData() {
  allData.then(data => {
    travelerData = data[0],
    destinationData = data[1],
    tripsData = data[2]
    initialSetup(true)
  }).catch(error => console.log(error))
};

  function initialSetup(first) {
    travelerArray = travelerData.travelerData.map(traveler => new Traveler(traveler));
    travelerRepo = new TravelerRepository(travelerArray);
    tripsArray = tripsData.tripsData.map(trip => new Trip(trip));
    tripsRepo = new Trips(tripsArray)
    destinationsArray = destinationData.destinationData.map(destination => new Destination(destination));
    destinationRepo = new DestinationRepo(destinationsArray)
    if (first) {
      randomTraveler = getRandomUser(travelerRepo.travelerData)
    }
  };

  function getRandomUser(array) {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  };
