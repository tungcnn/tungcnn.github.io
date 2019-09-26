$('#footer').load('footer.html');
const API_URL = 'https://treasurehunt-sit-209.now.sh/api';
// const API_URL = 'http://localhost:5000/api';
var quest;
$.get(`${API_URL}/listStores`) 
.then(response => {  
    quest = response
}) 
.catch(error => {     
  console.error(`Error: ${error}`);   
}); 

function distince(checkPo, goal)
{
    var a = Math.abs(checkPo[0] - goal[0]);
    var b = Math.abs(checkPo[1] - goal[1]);
    var c = a*a + b*b;
    return Math.sqrt(c);
}

var x = document.getElementById("map");
var i = 0;

//function with the button from html
function getLocation() {
  if (navigator.geolocation) {
    if (i < quest.length)
    {
        navigator.geolocation.getCurrentPosition(thePosition);
    }
    else
    {
        x.innerHTML = "You finished the quest";
    }
  } 
  else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
//this show the current location on a map
function thePosition(position) {
    var nowPosition = [position.coords.longitude, position.coords.latitude];
    var destination = [quest[i].lon, quest[i].lat];
    distance = distince(nowPosition, destination) * 10000;
    if (distance <= 3 && i == (quest.length - 1))
    {

    }
    if (distance > 3)
    {
        x.innerHTML = "YOU ARE " + Math.ceil(distance) + " AWAY FROM " + quest[i].name;
    }
    else
    {
        if (i != (quest.length - 1))
        {
            x.innerHTML = "you've reached your location, please do the this instruction: " + quest[i].instr + ", then move to the next one is " + quest[i + 1].name;
            i++;
        }
        else
        {
            x.innerHTML = "you reached the last point"
        }
        i++;
    }
}