
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
    Features= response.features
     console.log(Features);
    Features.forEach(function (feature) {
        //L.geoJson(feature).addTo(map)
        L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]]).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`).addTo(map);
    })
});




// Create an overlayMaps object to hold the bikeStations layer.
// var overlayMaps = {
//   "Bike Stations": bikeStations
// };



// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);
