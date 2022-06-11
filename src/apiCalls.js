function getPromise(dataType) {
  return fetch(`http://localhost:3001/api/v1/${dataType}`).then(response => response.json())
}

let allData = Promise.all([getPromise('travelers'), getPromise('destinations'), getPromise('trips')]);


export {
  allData
}
