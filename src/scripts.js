// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');

//----GLOBAL VARIABLES----
let travelerData = [];
let destinationData = [];
let tripsData = [];
let randomTraveler;
let travelerArray;
let travelerRepo;
let tripsRepo;
let destinationsArray;
let destinationRepo;

//----EVENT LISTENERS----
window.addEventListener('load', loadData);

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
    tripsRepo = new Trips(tripsData.tripsData)
    destinationsArray = destinationData.destinationData.map(destination => new Destination(destination));
    destinationRepo = new DestinationRepo(destinationsArray)
  };

  function getRandomUser(array) {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  };
