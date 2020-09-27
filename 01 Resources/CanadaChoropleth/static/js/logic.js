/* UofT SCS Data Analytics Boot Camp
  Project - 2
  Filename: logic.js
  Author:   Vivianti Santosa
  Date:     2020-09-29
*/

// Provinces data ------------------------------------------------------------
var provinces = [
  {
    PRUID: 59,
    Province: "BC",
    Pct_Aborigin_Pop: "6.6%",
    Pct_Aborigin_Arrested: "27.2%",
    Aborigin_Disparity_Index: 4.10,
    Black_Disparity_Index: 1.4,
    Incarcerated_Pop:7.2
  },
  {
    PRUID: 24,
    Province: "QC",
    Pct_Aborigin_Pop: "4.5%",
    Pct_Aborigin_Arrested: "10.9%",
    Aborigin_Disparity_Index: 2.42,
    Black_Disparity_Index: 0,
    Incarcerated_Pop:7.1
  },
  {
    PRUID: 62,
    Province: "NU",
    Pct_Aborigin_Pop: "85.5%",
    Pct_Aborigin_Arrested: "100%",
    Aborigin_Disparity_Index: 1.71,
    Black_Disparity_Index: -1,
    Incarcerated_Pop:1.1
  },
  {
    PRUID: 11,
    Province: "PE",
    Pct_Aborigin_Pop: "3.6%",
    Pct_Aborigin_Arrested: "0%",
    Aborigin_Disparity_Index: 0,
    Black_Disparity_Index: -1,
    Incarcerated_Pop:1.5
  },
  {
    PRUID: 47,
    Province: "SK",
    Pct_Aborigin_Pop: "6.6%",
    Pct_Aborigin_Arrested: "27.2%",
    Aborigin_Disparity_Index: 3.66,
    Black_Disparity_Index: 0.2,
    Incarcerated_Pop:13.1
  },
  {
    PRUID: 60,
    Province: "YU",
    Pct_Aborigin_Pop: "23.7%",
    Pct_Aborigin_Arrested: "42.9%",
    Aborigin_Disparity_Index: 1.81,
    Black_Disparity_Index: -1,
    Incarcerated_Pop:2
  },
  {
    PRUID: 46,
    Province: "MB",
    Pct_Aborigin_Pop: "18.2%",
    Pct_Aborigin_Arrested: "54.7%",
    Aborigin_Disparity_Index: 3.01,
    Black_Disparity_Index: 0.4,
    Incarcerated_Pop:8.8
  },
  {
    PRUID: 35,
    Province: "ON",
    Pct_Aborigin_Pop: "3.9%",
    Pct_Aborigin_Arrested: "12.2%",
    Aborigin_Disparity_Index: 3.12,
    Black_Disparity_Index: 2.6,
    Incarcerated_Pop:4.2
  },
  {
    PRUID: 13,
    Province: "NB",
    Pct_Aborigin_Pop: "6.4%",
    Pct_Aborigin_Arrested: "12.3%",
    Aborigin_Disparity_Index: 1.93,
    Black_Disparity_Index: 6.8,
    Incarcerated_Pop:17
  },
  {
    PRUID: 61,
    Province: "NW",
    Pct_Aborigin_Pop: "50.4%",
    Pct_Aborigin_Arrested: "100%",
    Aborigin_Disparity_Index: 1.99,
    Black_Disparity_Index: -1,
    Incarcerated_Pop:2.4
  },
  {
    PRUID: 48,
    Province: "AB",
    Pct_Aborigin_Pop: "7.6%",
    Pct_Aborigin_Arrested: "31.6%",
    Aborigin_Disparity_Index: 4.14,
    Black_Disparity_Index: 0.3,
    Incarcerated_Pop:7.7
  },
  {
    PRUID: 10,
    Province: "NL",
    Pct_Aborigin_Pop: "11.4%",
    Pct_Aborigin_Arrested: "10.5%",
    Aborigin_Disparity_Index: 0.92,
    Black_Disparity_Index: -1,
    Incarcerated_Pop:2.2
  },
  {
    PRUID: 12,
    Province: "NS",
    Pct_Aborigin_Pop: "8.2%",
    Pct_Aborigin_Arrested: "10.4%",
    Aborigin_Disparity_Index: 1.28,
    Black_Disparity_Index: 5,
    Incarcerated_Pop:9.2
  }
];

// Creating map object -------------------------------------------------------
var myMap = L.map("map", {
  center: [55.0000, -97.0000],
  zoom: 4
});

// Adding tile layer
// streetMap layers
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});
// lightMap layer
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Defining a baseMaps object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
var baseMaps = {
  "Street Map": streetMap,
  "Light Map": lightMap
};

// We create the layers for our two different sets of data, earthquakes and
// tectonicplates.
var aboriginRDI_layer = new L.LayerGroup();
var blackRDI_layer = new L.LayerGroup();
var Incarcerated_Pop_layer = new L.LayerGroup();

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!
var overlays = {
  "Aborigin Disparity Index": aboriginRDI_layer,
  "Black Disparity Index": blackRDI_layer,
  "Incarcerated Population": Incarcerated_Pop_layer
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control
  .layers(baseMaps, overlays)
  .addTo(myMap);

// Load in geojson data ------------------------------------------------------
var geoData = "static/data/canada_provinces.geojson";

// Grab data with d3
d3.json(geoData, function(data) {
  console.log("here 2",data.features);
  
  // Loop through the geoJSON data then for each object append "CRIME DATA" information
  data.features.forEach((user) => {
    // iterare through province
    for (var i=0; i < 13; i++) {
      if (provinces[i].PRUID == user.properties.PRUID) {
        // push each of the information to geoJson properties
        user.properties["Aborigin_Disparity_Index"] = provinces[i].Aborigin_Disparity_Index;
        user.properties["Pct_Aborigin_Pop"] = provinces[i].Pct_Aborigin_Pop;
        user.properties["Pct_Aborigin_Arrested"] = provinces[i].Pct_Aborigin_Pop;
        user.properties["Black_Disparity_Index"] = provinces[i].Black_Disparity_Index;
        user.properties["Incarcerated_Pop"] = provinces[i].Incarcerated_Pop;
      }}
  }); 

  console.log("here 3",data.features);

  // Grab second data with d3  
  var geoData1 = "static/data/Median_Household_Income_2016.geojson";
  d3.json(geoData1, function(data1) {
    //console.log("here 4 ", data1);
    //console.log("provinces", provinces);

    // Create choropleth layer for Aborigin_Disparity_Index
    L.choropleth(data, {
      // Set valueProperty (value that define the color) as: RDIvalue
      valueProperty: "Aborigin_Disparity_Index",

      scale: ["#ffffb2", "#b10026"],// Set color scale
      steps: 5,// Number of breaks in step range
      mode: "q",// q for quartile, e for equidistant, k for k-means
      style: {
        color: "#fff",// Border color
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Province/Territory: " + feature.properties.PRENAME + 
          "<br>Race Disparity Index:" + feature.properties.Aborigin_Disparity_Index  +
          "<br>Aborigin Population:" + feature.properties.Pct_Aborigin_Pop  +
          "<br>Aborigin Inmates:" + feature.properties.Pct_Aborigin_Arrested );
      }
    }).addTo(aboriginRDI_layer);

    // Create choropleth layer for Black_Disparity_Index
    L.choropleth(data, {
      // Set valueProperty (value that define the color) as: RDIvalue
      valueProperty: "Black_Disparity_Index",

      scale: ["#ffffb2", "#b10026"],// Set color scale
      steps: 5,// Number of breaks in step range
      mode: "q",// q for quartile, e for equidistant, k for k-means
      style: {
        color: "#fff",// Border color
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Province/Territory: " + feature.properties.PRENAME + 
          "<br>Race Disparity Index:" + feature.properties.Black_Disparity_Index);
      }
    }).addTo(blackRDI_layer);

    // Create choropleth layer for Incarcerated_Population
    L.choropleth(data, {
      // Set valueProperty (value that define the color) as: RDIvalue
      valueProperty: "Incarcerated_Pop",

      scale: ["#e6e6ff", "#000080"],// Set color scale
      steps: 5,// Number of breaks in step range
      mode: "q",// q for quartile, e for equidistant, k for k-means
      style: {
        color: "#fff",// Border color
        weight: 1,
        fillOpacity: 0.8
      },
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Province/Territory: " + feature.properties.PRENAME + 
          "<br>Incarcerated_Pop:" + feature.properties.Incarcerated_Pop);
      }
    }).addTo(Incarcerated_Pop_layer);


    // Set up LEGEND ------------------------------------------------------------------------------------
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h4>Race Disparity Index</h4>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
  });
});


