/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7769a980d6aa4777213ba68886661157';
const zip = document.getElementById('zip').value;
const feel =  document.getElementById('feelings').value;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
  const completeURL = baseURL+zip+apiKey
  console.log('clicked')
  getWeather(completeURL)
}

/* Function to GET Web API Data*/
const getWeather = async (url)=>{
  const res = await fetch(url)

  try {
    const data = await res.json()
    console.log(data)
    // return data

  } catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data)
    const response = await fetch(completeURL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newdData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // handle the error
    }
};

/* Function to GET Project Data */
/* Update UI */
const retrieveData = async () =>{
  const request = await fetch('/addData');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
  document.getElementById('content').innerHTML = allData.feel;
  document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }

// getPost(completeURL)
//   .then(function(data) {
//     console.log(data);
//     // Add data to post request
//     postData('/addData', {
//       //zip: zip,
//       temp: data.temp,
//       feel: feel,
//       date: newDate
//     });
//   });

function postGet(){
  postData('/addData', {
    // temp: allData.temp,
    feel: feel,
    date: newDate})
      .then(function(data){
          retrieveData('/addData')
  }
            )
}


// const getWeather = async (url)=>{
//   const res = await fetch(url)

//   try {
//     const data = await res.json();
//     console.log(data)
//     return data;

//   } catch(error) {
//     console.log("error", error);
//   }
// }

postGet()
