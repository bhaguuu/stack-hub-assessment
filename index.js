
window.onload = function () {
  var dps = []; // dataPoints
  var chart = new CanvasJS.Chart("chartContainer", {
    backgroundColor: "white",
    title: {
        text: "Dynamic Graph"
    },
    data: [{
        type: "line",
        axisYType: "secondary",
        lineColor: "Green",
        dataPoints: dps,
        markerSize: 0, // Hide data points
        showInLegend: false // Hide the legend entry for this data series
    }],
    axisX:{
      title: "Time",
         labelFontColor:"black",
      gridThickness: 0.5,
      gridColor: "#808080",
    },
    axisY2:{
      title: "Price",
      gridColor: "#808080",
      labelFontColor:"black",
      gridThickness: 0.5,
     
    },
   
});



  var yVal = 15200;
  var updateInterval = 1000;
  var dataLength = 20; // number of dataPoints visible at any point

  
  var updateChart = function (count) {
  
  
    count = count || 1;

    for (var j = 0; j < count; j++) {
      yVal = yVal +(Math.random() * 10) - 5;;
      var  xVal = new Date().getTime();
      dps.push({
        x: new Date(), // Use the current time for x-axis
        y: yVal
      });
    }

    // Sort the dataPoints array chronologically based on x
    dps.sort((a, b) => a.x - b.x);

    if (dps.length > dataLength) {
      dps.shift();
    }

    chart.render();
  };

  updateChart(dataLength);
  setInterval(function () {
    updateChart();
  }, updateInterval);

  // Add an input button to allow the user to add new data points
  document.getElementById('addDataPointBtn').addEventListener('click', function () {
    var inputValue = parseFloat(prompt('Enter Price'));
    if (!isNaN(inputValue)) {
      yVal = inputValue;
      updateChart();
    }else{
      prompt('Add Valid Price')
    }
  });

  // filter option for different timelines
  function filterData(selectedInterval) {
    var currentTime = new Date().getTime();
    var intervalInMilliseconds = selectedInterval * 60 * 1000;

    var filteredData = dps.filter(function (dataPoint) {
      return (currentTime - dataPoint.x) < intervalInMilliseconds;
    });

    chart.options.title.text = "Price - Last " + (selectedInterval) + " minutes";
    chart.data[0].dataPoints = filteredData;
    chart.render();
  }

  // Add filter options for different time intervals
  var filterOptions = document.getElementById('filterOption');
  filterOptions.addEventListener( 'change' , function () {
    var selectedValue = parseInt(this.value);
    console.log(selectedValue)
    filterData(selectedValue);
  });

  // Initial filter option (1 minute)
  filterData(1);
};

// dark and light mode toggle
document.getElementById('darkModeBtn').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
  });
  
