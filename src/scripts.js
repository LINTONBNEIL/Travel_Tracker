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

let tabs = document.querySelector('.tabs-container');
let tabButton = document.querySelectorAll('.tab-button');
let contents = document.querySelectorAll('.box')


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

let date;



//----EVENT LISTENERS----
tabs.addEventListener('click', changeTabs)

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
  dateFunction()
  createTraveler(travelers)
  createDestinations(destinations)
  createTrips(trips)
};

const dateFunction = () => {
    let d = new Date()
    let year = d.getFullYear().toString()
    let month = d.getMonth().toString()
    let day = d.getDate().toString()
    if (month.length < 2) {
    month = '0' + month;
    }
    if (day.lenght < 2) {
      day = '0' + day;
    }
    date = [year, month, day].join('/')
}

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
  findUpcomingTrips(travelersTrips)
  findPastTrips(travelersTrips)
  findPendingTrips(travelersTrips)
  findYearlySpent(travelersTrips)
}

const setTripsDestination = () => {
  travelersTrips.forEach(trip => {
  let destinationObj = destinationRepo.findDestination(trip.destination);
  trip.destination = destinationObj;
  });
};

const findYearlySpent = (travelersTrips) => {
let yearlySpent = travelersTrips.reduce((acc, trip) => {
    if(trip.date.includes('2022')) {
      let totalLodging = parseInt((trip.destination.lodgingCost * trip.travelers) * trip.duration)
      let totalFlight =  parseInt(trip.destination.flightCost * trip.travelers)
      let agentFee = (totalLodging + totalFlight) * .10
      acc += totalLodging + totalFlight + agentFee
    }

    return acc
  }, 0)
  displayYearlySpent(yearlySpent)
}

const findPresentTrips = (travelersTrips) => {
  let presentTrips = travelersTrips.filter(trip => {
    if (trip.date === date) {
    return trip
  }
  })
  displayPresentTrips(presentTrips)
};

const findUpcomingTrips = (travelersTrips) => {
  let upcomingTrips = travelersTrips.filter(trip => {
    if (trip.date > date) {
      return trip
    }
  })
  displayUpcomingTrips(upcomingTrips)
}

const findPastTrips = (travelersTrips) => {
  let pastTrips = travelersTrips.filter(trip => {
    if (trip.date < date) {
      return trip
    }
  })
  displayPastTrips(pastTrips)
}

const findPendingTrips = (travelersTrips) => {
  let pendingTrips = travelersTrips.filter(trip => {
    if (trip.status !== 'approved') {
      return trip
    }
  })
  displayPendingTrips(pendingTrips)
}

const getRandomUser = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
};

//----DOM FUNCTIONS----
const displayTravelerInfo = (randomTraveler) => {
  travelerName.innerHTML = `Welcome, ${randomTraveler.name}`
};

const displayYearlySpent = (yearlySpent) => {
  if (yearlySpent > 0) {
    travelerAmount.innerHTML = `You spent, $${yearlySpent} dollars this year!`
  } else {
    travelerAmount.innerHTML = `What? $${yearlySpent} dollars on trips?`
  }
};

function changeTabs() {
  let id = event.target.dataset.id;
  if (id) {
    tabButton.forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    contents.forEach(content => {
      content.classList.remove('active');
    });

    let element = document.getElementById(id);
    element.classList.add('active')
  }
}

const displayPastTrips = (pastTrips) => {
  // console.log('past', pastTrips)
  let pastTripCard = ''
  pastTrips.forEach(trip => {
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

const displayPresentTrips = (presentTrips) => {
  console.log('present', presentTrips)
    let presentTripCard = ''
    presentTrips.forEach(trip => {
      presentTripCard += `
      <article class="traveler-card">
      <h2>${trip.destination.name}</h2>
      <image class="picture" src=${presentTrip.destination.image}></image>
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

const displayUpcomingTrips = (upcomingTrips) => {
  // console.log('upcoming', upcomingTrips)
  let upcomingTripCard = ''
    upcomingTrips.forEach(trip => {
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

const displayPendingTrips = (pendingTrips) => {
  // console.log('pending', pendingTrips)
  let pendingTripCard = ''
    pendingTrips.forEach(trip => {
    pendingTripCard += `
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
    pendingBox.innerHTML = pendingTripCard
}
