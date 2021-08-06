export const chartBase = `<html>

<head>
  <title>Whatsapp chart</title>
  <style>
    #chartdiv {
      width: 100%;
      height: 100%;
    }
  </style>
  <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

  <script>
    am4core.ready(function () {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      const chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      chart.data = CHART_DATA

      // Create axes
      const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      dateAxis.dataFields.category = "date";
      dateAxis.title.text = "Date";
      dateAxis.renderer.minGridDistance = 50;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Messages";

      // Add scrollbar
      chart.scrollbarX = new am4charts.XYChartScrollbar();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      // Add legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";
      chart.legend.scrollable = true;

      // Create series
      CHART_SERIES

    });
  </script>
</head>

<body>
  <div id="chartdiv"></div>
</body>

</html>`
