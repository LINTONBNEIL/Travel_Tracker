function getPromise(dataType) {
  return fetch(`http://localhost:3001/api/v1/${dataType}`).then(response => response.json())
}


const allData = () => {
  return Promise.all([getPromise('travelers'), getPromise('destinations'), getPromise('trips')]);
}


const postUserCall = (postObject, dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`, {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
    	'Content-Type': 'application/json'
    }
  })
  .then(response => checkForError(response))
  .then(response => response.json())
};

const checkForError = (response) => {
  if (response.ok) {
    return response
  } else {
    throw new Error(response.status)
  }
}


export {
  allData,
  postUserCall,
  getPromise,
  checkForError
}
