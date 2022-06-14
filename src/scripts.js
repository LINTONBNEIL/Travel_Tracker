// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//----IMPORTS----
import './images/turing-logo.png'
import dayjs from 'dayjs'
import './css/styles.css';
import {
  allData,
  postUserCall,
  getPromise,
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
let totalSum  = document.querySelector('.totalSum')
let postForm = document.querySelector('.form-two-wrapper')
let destinationForm = document.getElementById('destinationOption');
let calendarForm = document.getElementById('calendarValue');
let travelerForm = document.getElementById('travelersValue');
let durationForm = document.getElementById('durationValue');
let submitForm = document.getElementById('submitValue')
//----BUTTONS----
let dashboard = document.querySelector('.dashboard');
let newTrips = document.querySelector('.new-trips');
let logout = document.querySelector('.logout');
//----DASHBOARD----
let tripsFormPage = document.querySelector('.trips-form');
//----LOGIN----
let loginPage = document.querySelector('.loginPage');
let mainPage = document.querySelector('.mainPage');
let username = document.getElementById('username');
let password = document.getElementById('password');
let submitLogin = document.getElementById('submitLogin');
let loginForm = document.querySelector('.login-form')


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
//FIND YEARLY NEEDS TO BE MORE DYNAMIC
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
    if (dayjs(trip.date) <= dayjs() && dayjs() <= dayjs(trip.date).add(trip.duration, 'day') && trip.status !== 'pending') {
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
  showSubmitForm()
}

//----POST----
const calculatePostSum = () => {
  let totalPostSum = destinationData.reduce((acc, destination) => {
    if (parseInt(destinationForm.value) === destination.id) {
      let totalFormLodging = parseInt((destination.estimatedLodgingCostPerDay * travelerForm.value) * durationForm.value)
      let totalFormFlight =  parseInt((destination.estimatedFlightCostPerPerson * travelerForm.value) * 2)
      let agentFormFee = (totalFormLodging + totalFormFlight) * .10
      acc += totalFormLodging + totalFormFlight + agentFormFee

    }
    return acc
  }, 0)

  totalSum.innerHTML = `$${totalPostSum} dollars for Trip!`
}

const reloadData = (formType) => {
  allData().then(data => {
    travelerData = data[0].travelers
    destinationData = data[1].destinations
    tripsData = data[2].trips
    initialSetup(travelerData, destinationData, tripsData)
  }).catch(error => console.log(error))
};

const submitFormPost = () => {
  event.preventDefault()
  let tripObj = {
    id: tripsRepo.tripsData.length + 1,
    userID: randomTraveler.id,
    destinationID: parseInt(destinationForm.value),
    travelers: parseInt(travelerForm.value),
    date: calendarForm.value.split('-').join('/'),
    duration: parseInt(durationForm.value),
    status: 'pending',
    suggestedActivities: []
  }

  postUserCall(tripObj, 'trips').then(response => reloadData('trips'))
}

//----DOM FUNCTIONS----
//----CHANGE VIEWS----
const showSubmitForm = () => {
  tabs.classList.add('hidden')
  tripsFormPage.classList.remove('hidden')
}

const showMainPage = () => {
  tabs.classList.remove('hidden')
  tripsFormPage.classList.add('hidden')
  postForm.reset()
}

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

const changeTabs = () => {
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
  console.log('past', pastTrips.length)
  let pastTripCard = ''
  if (pastTrips.length > 0) {
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
} else {
  pastBox.innerHTML = `<article class="traveler-card"><h2>No Past Trips</h2></article>`
}
}

const displayPresentTrips = (presentTrips) => {
  console.log('present', presentTrips)
    let presentTripCard = ''
    if (presentTrips.length > 0) {
    presentTrips.forEach(trip => {
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
} else {
  presentBox.innerHTML = `<article class="traveler-card"><h2>No Present Trips</h2></article>`
}
}

const displayUpcomingTrips = (upcomingTrips) => {
  console.log('upcoming', upcomingTrips)
  let upcomingTripCard = ''
  if (upcomingTrips.length > 0) {
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
  } else {
  upcomingBox.innerHTML = `<article class="traveler-card"><h2>No Upcoming Trips</h2></article>`
  }
}

const displayPendingTrips = (pendingTrips) => {
  console.log('pending', pendingTrips)
  let pendingTripCard = ''
  if (pendingTrips.length > 0) {
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
  } else {
    pendingBox.innerHTML = `<article class="traveler-card"><h2>No Pending Trips</h2></article>`
  }
}


//----TOGGLE LOGIN----
const displayLoginPage = () => {
  loginPage.classList.remove('hidden');
  mainPage.classList.add('hidden');
  loginForm.reset()
}

const displayMainPage = () => {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
};

//----CHECKLOGIN----
const checkLogin = () => {
 if (password.value === 'travel') {
   event.preventDefault();
   let userID = parseInt(username.value.split('traveler')[1]);
   fetchCorrectUser(userID)
 }
}

const fetchCorrectUser = (userID) => {
  let user = getPromise(`travelers/${userID}`);
  user.then(data => {
    randomTraveler = data;
  });
  allData().then(data => {
  travelerData = data[0].travelers
  destinationData = data[1].destinations
  tripsData = data[2].trips
  initialSetup(travelerData, destinationData, tripsData)
  }).catch(error => console.log(error))
  displayMainPage();
}


//----EVENT LISTENERS----
tabs.addEventListener('click', changeTabs)
newTrips.addEventListener('click', createOptions)
submitForm.addEventListener('click', submitFormPost)
dashboard.addEventListener('click', showMainPage)
submitLogin.addEventListener('click', checkLogin)
logout.addEventListener('click', displayLoginPage)
postForm.addEventListener('click', calculatePostSum)
