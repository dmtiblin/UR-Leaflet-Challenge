
// Define variables for our tile layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// Create a baseMaps object to hold the streetmap layer.
var baseMaps = {
    Street: street,
    Topography: topo
  };

// Create the map object with options.
var map = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [street]
  });

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url).then(function(response) {
  
    
    // Once we get a response, send the data.features object to the createFeatures function.
    //createFeatures(response.features);
    //bbox":[-179.9383,-60.1048,-3.41,179.75016666667,69.9175,604.48]}
    var Features= response.features;
     console.log(Features);
    var minDepth = response.bbox[2]
    var maxDepth = response.bbox[5]
    
    Features.forEach(function (feature) {
        //L.geoJson(feature).addTo(map)
        //createfunction to get marker style
        
        var size = "";
        if(feature.properties.mag > 5) {
          size = 100000
        }
        else if (feature.properties.mag > 4) {
          size = 50000
        };

        var color = "";
        if(feature.geometry.coordinates[2] <20) {
          color = "#FF4040"}
        else if(feature.geometry.coordinates[2] < 50) {
          color = "#EE3B3B"}
        else if(feature.geometry.coordinates[2] < 100) {
          color = "#CD3333"}
        else if(feature.geometry.coordinates[2] < 300) {
          color = "#A52A2A"}
        else if (feature.geometry.coordinates[2] > 300) {
          color = "#8B2323"
        };

        L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{radius: size, color: color,fillColor: color, fillOpacity: .4}).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)} <br> magnitude:  ${feature.properties.mag} </p>`).addTo(map);
});
});




// Create an overlayMaps object to hold the bikeStations layer.
// var overlayMaps = {
//   "Bike Stations": bikeStations
// };



// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);
