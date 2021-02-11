// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 500;
// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};
// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Configure a parseTime function which will return a new Date object from a string
// var parseTime = d3.timeParse("%B");
// Load data from miles-walked-this-month.csv
var link = "https://project-two-group-one.herokuapp.com";
d3.json(link,function(entereddateData) {
  // Print the milesData
  console.log(entereddateData); 
  var dates = []
  var month_data = {
      "2019": {},
      "2020": {}
  }
//  Format the date and cast the miles value to a number
entereddateData.location.forEach(function(data) {
   var year = data[16];
   var month = data[15];
   
    if (parseInt(year)==2019){
      console.log(year,month);
        if (month in month_data[year]){
            month_data[year][month]+=1     
        }
        else {
            month_data[year][month]=0  
        }
    }
        if (parseInt(year)==2020){
            if (month in month_data[year]){
                month_data[year][month]+=1     
            }
            else {
                month_data[year][month]=0  
            }
        }    
  });
  console.log(month_data)
  var trace1 = {
    x: Object.keys(month_data["2019"]),
    y: Object.values(month_data["2019"]),
    name: '2019',
    type: 'line'
  };
  var trace2 = {
    x: Object.keys(month_data["2019"]),
    y: Object.values(month_data["2020"]),
    name: '2020',
    type: 'line'
  };
  var data = [trace1, trace2];
  var layout = {barmode: 'group',
    title: {
      text:'Potholes 2019 v. 2020',
      font: {
        family: 'Segoe UI',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Month',
        font: {
          family: 'Segoe UI',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Number of Potholes',
        font: {
          family: 'Segoe UI',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };
  Plotly.newPlot('chart', data, layout);
});

