/ *Global Variables* /

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7769a980d6aa4777213ba68886661157';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/ *Function called by event listener* /
function performAction(e){
  console.log('clicked')
  const zip = document.getElementById('zip').value;
  const feel =  document.getElementById('feelings').value;
  const completeURL = baseURL+zip+apiKey;
  getWeather(completeURL);
  postGet();
}

/ *Function to GET Web API Data*/
const getWeather = async (url)=>{
  const res = await fetch(url);

  try {
    const data = await res.json();
    console.log(data);
    // return data

  } catch(error) {
    console.log("error", error);
  }
}

/ *Function to POST data* /
const postData = async (url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    // handle the error
    }
};

/ *Function to GET Project Data* /
/// *Update UI* /
const retrieveData = async () =>{
  const request = await fetch('/addData');
  try {
  // Transform into JSON
  const allData = await request.json();
  console.log(allData);
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

function postGet(){
  postData('/addData', {
    // temp: allData.temp,
    feel: feel,
    date: newDate})
      .then(function(data){
          retrieveData();
  });
}

postGet();
