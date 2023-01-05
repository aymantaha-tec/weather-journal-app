/* Global Variables */
const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+ 1) +'.'+ d.getFullYear();


const apiKey = '668b7bf6afe236a7629a8bac42277c26&units=imperial';

// Main function to run button is clicked 
const runCode = () => {
    //To get an value by id  zip and feel
    const zip = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    const myUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
    const fetchApi = collectMyData(myUrl);
    
    fetchApi.then((data) => {
        const finalData = {
            myTemp: data.main.temp,
            theFeeling: feeling,
            theDate: newDate
        }
        sendData('/add', finalData);
    }).then(() => retrieveData())
};  


//function to get data from openweathermap
const collectMyData = async (myUrl) => {

const response = await fetch(myUrl);
    try{
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log('error');
    }
};

// function to send data to localserver
const sendData = async (addR, finalData) => {
    const response = await fetch(addR, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(finalData),    
    });
    try{
        const theData = await response.json();
        console.log(theData);
    }
    catch(error){
        console.log('errooooor', error)
    }
}

//function to get data from localserver
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.myTemp) + ' '+ 'degrees';
    document.getElementById('content').innerHTML = allData.theFeeling;
    document.getElementById("date").innerHTML =allData.theDate;
    }
    catch(error) {
    console.log("error", error);
      // appropriately handle the error
    }
}


// This button when clicked works calls runCode step 1
btn.addEventListener('click', runCode);