// $('#footer').load('footer.html');
const API_URL = 'http://localhost:5000/api'; 

    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    var lonLat = new OpenLayers.LonLat( 145.114364, -37.847387)
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
        markers.addMarker(new OpenLayers.Marker(nowPo,icon));
        var zoom=18;
        map.setCenter (nowPo, zoom);
    }
    
    markers.events.register("click", markers, function()
    {
        location.href = "journey.html"

        // $.get(`${API_URL}/api/quest`)   
        //     .then(response => {     
        //         response.map(sensorData => {   
        //         });  
    });