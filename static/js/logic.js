
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
        
        //create marker size based on magnituted of quake 1-10
        //var size = "";
        //if(feature.properties.mag  <2 ) {
        //   size = 10000 
        // }
        // else if (feature.properties.mag <4) {
        //   size = 20000}
        // else if (feature.properties.mag <6) {
        //   size = 40000}
        // else if (feature.properties.mag <7) {
        //   size = 60000}
        // else if (feature.properties.mag <8) {
        //   size = 80000}
        // else if (feature.properties.mag <9) {
        //   size = 100000}
        // else {
        //   size = 120000}
        // ;
        var size = "";
        if(feature.properties.mag  <2 ) {
          size = 10000}
        else size = ((feature.properties.mag * 50)**2)
          
        //create color based on depth of quake
        var color = "";
        if(feature.geometry.coordinates[2] <35) {
          color = "#FF7F50"}
        else if(feature.geometry.coordinates[2] < 70) {
          color = "#FF4040"}
        else if(feature.geometry.coordinates[2] < 185) {
          color = "#CD3333"}
        else if(feature.geometry.coordinates[2] < 300) {
          color = "#8B2323"}
        else if (feature.geometry.coordinates[2] > 300) {
          color = "black"
        };

        L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{radius: size, color: "black",fillColor: color, fillOpacity: 1, weight: .5})
        .bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p> <p>Magnitude:  ${feature.properties.mag} <br> Depth:  ${feature.geometry.coordinates[2]} </p>`).addTo(map);
});
});




// Create an overlayMaps object to hold the bikeStations layer.
// var overlayMaps = {
//   "Bike Stations": bikeStations
// };

//Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

var legend = L.control({position: 'bottomright'})
legend.onAdd= function() {
  var div = L.DomUtil.create("div", "info legend");
  var grades = ["<35","35 - 70", "70 - 185", "185 - 300", ">300" ]
    colors = ["#FF7F50", "#FF4040","#CD3333","#8B2323","black" ]
    labels = ["shallow", "moderately deep","deep","very deep", "deepest"]

    var legendInfo = "<h3>Earthquake Depth (km)</h3>" 
  div.innerHTML = legendInfo;

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      "<ul>" + '<i style="background:' + colors[i] + '"></i> ' +
        labels[i] +" " + grades[i] + "</ul>"}
  return div;

};
legend.addTo(map);

