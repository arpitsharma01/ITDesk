// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
function fetchAllocatedCategory() {
  var labelArray=[];
  var dataArray=[];
        fetch(`https://localhost:44327/api/deviceInfo/categoryList`, {
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // Authorization:
            //   "Bearer " + window.localStorage.getItem("token").toString(),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        })
          .then((res) => res.json())
          .then((data) => {
            var colors = ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'];
          var i=0;
          l=``;
            data.forEach((TempUser) => {
              labelArray.push(TempUser.deviceType);
              dataArray.push(TempUser.allocatedCount);
              l+=`<span style="color:${colors[i]};font-weight:900;font-style:bold;">${labelArray[i]}   </span>`;
            //    dType.push(TempUser.deviceType);
            i++;
            //    aCount.push(TempUser.allocatedCount);
            });
            console.log(data,"saksham");
         document.getElementById("te-al").innerHTML= l;
            var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labelArray,
    datasets: [{
      data: dataArray,
      backgroundColor: colors,
      hoverBackgroundColor: ['#ffb347'],
      hoverBorderColor: "#ffb347",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 60,
  },
});
          })
          .catch(function (error) {
            console.log("Looks like there was a problem: \n", error);
          });
  // pie chart options
}
