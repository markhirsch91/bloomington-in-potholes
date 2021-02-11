API_KEY = "pk.eyJ1IjoibWJ3aGlzdGxlciIsImEiOiJja2ZvamsydmYwMGprMnVtdTR5eG1uanpmIn0.4KKG-xZ3r7PuG9RQa3cCgA"
var myMap = L.map("map", {
  center: [39.1653, -86.5264],
  zoom: 14
});

var markers = [];

function buildMap(year) {
    // Creating map object
    console.log(year)
  if (markers.length > 0) {
    markers.forEach((d)=> {
      d.remove()
    })
  }
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Use this link to get the geojson data.
  var link = "https://project-two-group-one.herokuapp.com";

  // Grabbing our GeoJSON data..
  // 17.2 Activity 3 to add cluster group
  d3.json(link, function(data) {
    console.log(data)
    var potholes = data.location
    for (var i = 0; i < potholes.length; i++) {
      console.log(parseInt(data.location[i][16]),year)
      if (parseInt(data.location[i][16]) == year) {
        try {var pothole = potholes[i];
        var mark = L.marker([pothole[13], pothole[14]])
            // pop up not working...
            .bindPopup("<h1>" + pothole[9]+ "</h1>")
            .addTo(myMap);
          markers.push(mark)}
        catch {continue}
      }
      else if (year == "2019-2020") {
        try {var pothole = potholes[i];
        var mark = L.marker([pothole[13], pothole[14]])
              // pop up not working...
              .bindPopup("<h1>" + pothole[9]+ "</h1>")
              .addTo(myMap);
              markers.push(mark)}
          catch {continue}
      }

      
    }
    // // populate the dropdown menu
    // var sampleNames = data.names;
    // sampleNames.forEach((name) => {
    //     selector
    //         .append("option")
    //         .text(name)
    //         .property("value", name);
    // });
  });
}

// function init() {
//   var dropdownSelector = d3.select("#table-selector-dropdown");
//   d3.json(link).then((data) => {
//     var
//   })
// }

// function optionChanged(nextYear) {
//   buildMap(nextYear);
// }


function selectYear() {
  // get table selection
  var selector = document.getElementById('table-selector-dropdown')
  var value = selector.options[selector.selectedIndex].value.toLowerCase()
  buildMap(value)
}
buildMap("2019-2020");
d3.select('#table-selector-dropdown').on("change",selectYear)