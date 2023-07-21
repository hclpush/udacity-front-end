/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '7769a980d6aa4777213ba68886661157'; // Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById('generate').addEventListener('click', performAction); // TODO: change name

/* Function called by event listener */
function performAction(e){
  console.log('clicked')

  const zip = document.getElementById('zip').value;
  const feel =  document.getElementById('feelings').value;

  // generateBtn.classList.remove('invalid');
    getWeather(baseURL, zip, apiKey)
        .then(function(data) {
            // add new data to POST request
            postData('/add', { temp: data.main.temp, date: newDate, feel: feel });
        }).then(function() {
            // update content in browser
            updateUI()
        }).catch(function(error) {
            console.log(error);
            alert('Have you entered a valid zip code?');
        });

}

/* Function to GET Web API Data */
const getWeather = async (baseURL, zip, apiKey)=>{
  const res = await fetch(`${baseURL}?q=${zip}&appid=${apiKey}`);

  try {
    const data = await res.json();
    // console.log(data);
    return data;

  } catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {})=>{
  // console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      feel: data.feel
    })
  });

    try {
      const newData = await response.json();
      console.log('newData', newData);
      return newData;
    }catch(error) {
      // console.log('response.json()', response.json());
      console.log('error', error);

    }
};

/* Function to GET Project Data */
/// *Update UI - provided by Udacity* /
const updateUI = async () =>{
  const request = await fetch('/all');
  try {
  // Log the response before parsing it as JSON
  console.log('Response:', request);

  // Transform into JSON
  const allData = await request.json();
  console.log(allData);

  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees in fahrenheit';
  document.getElementById('content').innerHTML = allData.feel;
  document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);

  }
}
