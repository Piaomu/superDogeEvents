let eventsArray = [{
  event: "ComicCon",
  city: "New York",
  state: "NY",
  attendance: 240000,
  date: "06/01/2017"
},
{
  event: "ComicCon",
  city: "New York",
  state: "NY",
  attendance: 250000,
  date: "06/01/2018"
},
{
  event: "ComicCon",
  city: "New York",
  state: "NY",
  attendance: 257000,
  date: "06/01/2019"
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "CA",
  attendance: 150000,
  date: "06/01/2018"
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "CA",
  attendance: 200000,
  date: "06/01/2019"
},
{
  event: "ComicCon",
  city: "San Diego",
  state: "CA",
  attendance: 150000,
  date: "07/01/2019"
},
{
  event: "HeroesCon",
  city: "Charlotte",
  state: "North Carolina",
  attendance: 45000,
  date: "06/01/2018"
},
{
  event: "HeroesCon",
  city: "Charlotte",
  state: "North Carolina",
  attendance: 50000,
  date: "06/01/2019"
},
];

//the default display is all events
let filteredEvents = eventsArray;

function buildDropDown() {
  const eventDD = document.getElementById("eventDropDown");
  
  let distinctEvents = [...new Set(eventsArray.map((event) => event.city)) ];

  let linkedHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All"></a>';
  let resultsHTML = "";

  for(let i = 0; i < distinctEvents.length; i++) {

    resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;

  }

  resultsHTML += linkedHTMLEnd;
  eventDD.innerHTML = resultsHTML;
  displayStats();
}

  function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
      currentAttendance = filteredEvents[i].attendance;
      total += currentAttendance;

      if (most < currentAttendance){
          most = currentAttendance;
      }

      if (least > currentAttendance || least < 0){
          least = currentAttendance;
      }


    }
    average = total / filteredEvents.length;
    
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
      undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    );
  }


// get the events for the selected city
function getEvents(element) {
  let city = element.getAttribute("data-string");
  let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || eventsArray;
  filteredEvents = curEvents;
  document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
  if(city != "All"){
    filteredEvents = curEvents.filter(function (event){
      if(event.city == city) {
        return event;
      }
    });
  }
  displayStats();
}

loadEventList();

function loadEventList() {
  let eventList = [];
  eventList = getData();
  displayData(eventList);
}

//Retrieve data from local storage
function getData(){
  let eventList = JSON.parse(localStorage.getItem("eventsArray")) || [];

  if (eventList.length == 0) {
    eventList = eventsArray;
    localStorage.setItem("eventsArray", JSON.stringify(eventList));
  }
  return eventList;
}

function saveEventData() {
  //grab the events out of local storage or create a new eventsArray
  let eventList = JSON.parse(localStorage.getItem("eventsArray")) || eventsArray;

  //create the address object from user-given data
  let obj = {};
  obj["event"] = document.getElementById("newEvent").value;
  obj["city"] = document.getElementById("newCity").value;
  obj["state"] = document.getElementById("newState").value;
  obj["attendance"] = parseInt(document.getElementById("newAttendance").value,
  10);
  obj["date"] = new Date(
    document.getElementById("newEventDate").value
  ).toLocaleDateString();

  //tells the computer to push the object into the array.
  eventList.push(obj);

  localStorage.setItem("eventsArray", JSON.stringify(eventList));

  //Accesss the values from the form by ID and add an object to the array.
  displayData(eventList);
}

function displayData(eventList) {
  const template = document.getElementById("Data-template");
  const resultsBody = document.getElementById("resultsBody");
  
  //clear table first
  resultsBody.innerHTML = "";
  for(let i = 0; i < eventList.length; i++) {
    const dataRow = document.importNode(template.content, true);

    dataRow.getElementById("event").textContent = eventList[i].event;
    dataRow.getElementById("city").textContent = eventList[i].city;
    dataRow.getElementById("state").textContent = eventList[i].state;
    dataRow.getElementById("attendance").textContent = eventList[i].attendance;
    dataRow.getElementById("date").textContent = new Date(eventList[i].date).toLocaleDateString();

    resultsBody.appendChild(dataRow);
  }
}