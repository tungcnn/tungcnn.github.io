$('#footer').load('footer.html');
const API_URL = 'https://treasurehunt-sit-209.now.sh/api'; 
// const API_URL = 'http://localhost:5000/api';
$.get(`${API_URL}/listStores`) 
.then(response => {  

    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    var lonLat = new OpenLayers.LonLat( response[0].lon, response[0].lat)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));

    navigator.geolocation.getCurrentPosition(thePosition);
    function thePosition(position) {
        var size = new OpenLayers.Size(21,25);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon('images/meow.jpg', size, offset);
        var nowPo = new OpenLayers.LonLat( position.coords.longitude, position.coords.latitude)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
        var player = new OpenLayers.Layer.Markers( "Markers" );
        map.addLayer(player);
        player.addMarker(new OpenLayers.Marker(nowPo,icon));
        var zoom=18;
        map.setCenter (nowPo, zoom);
    }
    
    markers.events.register("click", markers, function()
    {
        location.href = "journey.html" 
    });
  }) 
  .catch(error => {     
    console.error(`Error: ${error}`);   
  }); 