// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//----IMPORTS----
import './images/turing-logo.png'
import dayjs from 'dayjs'
import './css/styles.css';
import {
  allData,
  postUserCall,
  checkForError
} from './apiCalls.js'
import Destination from '../src/Destination.js'
import DestinationRepo from '../src/DestinationRepo.js'
import Traveler from '../src/Traveler.js'
import TravelerRepository from '../src/TravelerRepository.js';
import TripsRepo from '../src/TripsRepo.js'
import Trip from '../src/Trip.js'

//----QUERY SELECTORS----
let travelerName = document.querySelector('.traveler-greeting');
let travelerAmount = document.querySelector('.traveler-amount')
let presentBox = document.querySelector('.Present');
let upcomingBox = document.querySelector('.Upcoming');
let pendingBox = document.querySelector('.Pending');
let pastBox = document.querySelector('.Past');
//----TABS----
let tabs = document.querySelector('.tabs-container');
let tabButton = document.querySelectorAll('.tab-button');
let contents = document.querySelectorAll('.box');
//----FORM----
let destinationForm = document.getElementById('destinationOption');
let calendarForm = document.getElementById('calendar');
let travelerForm = document.getElementById('travelers');
let durationForm = document.getElementById('duration');
let submitForm = document.getElementById('submit')
//----BUTTONS----
let dashboard = document.querySelector('.dashboard');
let newTrips = document.querySelector('.new-trips');
let logout = document.querySelector('.logout');

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
    if(dayjs(trip.date).year() === dayjs().year()) {
      let totalLodging = parseInt((trip.destination.lodgingCost * trip.travelers) * trip.duration)
      let totalFlight =  parseInt((trip.destination.flightCost * trip.travelers) * 2)
      let agentFee = (totalLodging + totalFlight) * .10
      acc += totalLodging + totalFlight + agentFee
    }

    return acc
  }, 0)
  displayYearlySpent(yearlySpent)
}

const findPresentTrips = (travelersTrips) => {
  let presentTrips = travelersTrips.filter(trip => {
    if (dayjs(trip.date) === dayjs() && trip.status !== 'pending') {
    return trip
  }
  })
  displayPresentTrips(presentTrips)
};

const findUpcomingTrips = (travelersTrips) => {
  let upcomingTrips = travelersTrips.filter(trip => {
    if (dayjs(trip.date) > dayjs() && trip.status !== 'pending') {
      return trip
    }
  })
  displayUpcomingTrips(upcomingTrips)
}

const findPastTrips = (travelersTrips) => {
  let pastTrips = travelersTrips.filter(trip => {
    if (dayjs(trip.date) < dayjs() && trip.status !== 'pending') {
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

const createOptions = () => {
  destinationRepo.destinationData.forEach(destination => {
    destinationForm.innerHTML += `<option value=${destination.id}>${destination.name}</option>`
  })
}

// ----POST----
function reloadData(formType) {
  allData.then(data => {
    travelerData = data[0].travelers
    destinationData = data[1].destinations
    tripsData = data[2].trips
    initialSetup();
  }).catch(error => console.log(error))
};

const submitFormPost = () => {
  event.preventDefault()
  console.log(randomTraveler.id)
  let tripObj = {
    id: tripsRepo.tripsData.length,
    userID: randomTraveler.id,
    destinationID: destinationForm.value,
    travelers: travelerForm.value,
    date: calendarForm.value.split('-').join('/'),
    duration: durationForm.value,
    status: pending,
    suggestedActivities: []
  }
  postUserCall(tripObj, 'trips').then(response => reloadData('trips'))
}

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
  console.log('past', pastTrips)
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
  console.log('upcoming', upcomingTrips)
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
  console.log('pending', pendingTrips)
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



//----EVENT LISTENERS----
window.addEventListener('load', () => {
  allData.then(data => {
  travelerData = data[0].travelers
  destinationData = data[1].destinations
  tripsData = data[2].trips
  initialSetup(travelerData, destinationData, tripsData)
  }).catch(error => console.log(error))
});

tabs.addEventListener('click', changeTabs)
newTrips.addEventListener('click', createOptions)
submitForm.addEventListener('click', submitFormPost)
// dashboard.addEventListener('click')
//logout.addEventListener('click', )
