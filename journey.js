class Location
{
    constructor(name, array)
    {
        this.placeName = name;
        this.position = array;
    }
    distince(checkPo)
    {
        var a = Math.abs(checkPo[0] - this.position[0]);
        var b = Math.abs(checkPo[1] - this.position[1]);
        var c = a*a + b*b;
        return Math.sqrt(c);
    }
}

place1 = new Location("Building B somwehere", [145.114364, -37.847387]);
place2 = new Location("Food for thought", [145.114850, -37.848781]);
place3 = new Location("Caffeine", [145.113656, -37.846209]);

var quest = [place1, place2, place3];

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
    distance = quest[i].distince(nowPosition) * 10000;
    if (distance <= 3 && i == (quest.length - 1))
    {

    }
    if (distance > 3)
    {
        x.innerHTML = "YOU ARE " + Math.ceil(distance) + " AWAY FROM " + quest[i].placeName;
    }
    else
    {
        if (i != (quest.length - 1))
        {
            x.innerHTML = "you've reached your location, the next one is " + quest[i + 1].placeName;
        }
        else
        {
            x.innerHTML = "you reached the last point"
        }
        i++;
    }
}