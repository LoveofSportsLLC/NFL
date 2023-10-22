var colors = ["#727cf5", "#0acf97", "#fa5c7c"],
  dataColors = $("#basic-boxplot").data("colors"),
  options = {
    series: [
      {
        type: "boxPlot",
        data: [
          { x: "Jan 2015", y: [54, 66, 69, 75, 88] },
          { x: "Jan 2016", y: [43, 65, 69, 76, 81] },
          { x: "Jan 2017", y: [31, 39, 45, 51, 59] },
          { x: "Jan 2018", y: [39, 46, 55, 65, 71] },
          { x: "Jan 2019", y: [29, 31, 35, 39, 44] },
          { x: "Jan 2020", y: [41, 49, 58, 61, 67] },
          { x: "Jan 2021", y: [54, 59, 66, 71, 88] },
        ],
      },
    ],
    chart: { type: "boxPlot", height: 350, toolbar: { show: !1 } },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: (colors = dataColors ? dataColors.split(",") : colors)[0],
          lower: colors[1],
        },
      },
    },
    stroke: { colors: ["#a1a9b1"] },
  },
  chart = new ApexCharts(document.querySelector("#basic-boxplot"), options),
  colors = (chart.render(), ["#727cf5", "#0acf97", "#fa5c7c"]),
  options =
    ((dataColors = $("#scatter-boxplot").data("colors")) &&
      (colors = dataColors.split(",")),
    {
      series: [
        {
          name: "Box",
          type: "boxPlot",
          data: [
            { x: new Date("2017-01-01").getTime(), y: [54, 66, 69, 75, 88] },
            { x: new Date("2018-01-01").getTime(), y: [43, 65, 69, 76, 81] },
            { x: new Date("2019-01-01").getTime(), y: [31, 39, 45, 51, 59] },
            { x: new Date("2020-01-01").getTime(), y: [39, 46, 55, 65, 71] },
            { x: new Date("2021-01-01").getTime(), y: [29, 31, 35, 39, 44] },
          ],
        },
        {
          name: "Outliers",
          type: "scatter",
          data: [
            { x: new Date("2017-01-01").getTime(), y: 32 },
            { x: new Date("2018-01-01").getTime(), y: 25 },
            { x: new Date("2019-01-01").getTime(), y: 64 },
            { x: new Date("2020-01-01").getTime(), y: 27 },
            { x: new Date("2020-01-01").getTime(), y: 78 },
            { x: new Date("2021-01-01").getTime(), y: 15 },
          ],
        },
      ],
      chart: { type: "boxPlot", height: 350 },
      colors: colors,
      stroke: { colors: ["#a1a9b1"] },
      legend: { offsetY: 10 },
      xaxis: {
        type: "datetime",
        tooltip: {
          formatter: function (o) {
            return new Date(o).getFullYear();
          },
        },
      },
      grid: { padding: { bottom: 5 } },
      tooltip: { shared: !1, intersect: !0 },
      plotOptions: {
        boxPlot: { colors: { upper: colors[0], lower: colors[1] } },
      },
    }),
  colors =
    ((chart = new ApexCharts(
      document.querySelector("#scatter-boxplot"),
      options,
    )).render(),
    ["#727cf5", "#0acf97", "#fa5c7c"]),
  dataColors = $("#horizontal-boxplot").data("colors"),
  options = {
    series: [
      {
        data: [
          { x: "Category A", y: [54, 66, 69, 75, 88] },
          { x: "Category B", y: [43, 65, 69, 76, 81] },
          { x: "Category C", y: [31, 39, 45, 51, 59] },
          { x: "Category D", y: [39, 46, 55, 65, 71] },
          { x: "Category E", y: [29, 31, 35, 39, 44] },
          { x: "Category F", y: [41, 49, 58, 61, 67] },
          { x: "Category G", y: [54, 59, 66, 71, 88] },
        ],
      },
    ],
    chart: { type: "boxPlot", height: 350 },
    plotOptions: {
      bar: { horizontal: !0, barHeight: "50%" },
      boxPlot: {
        colors: {
          upper: (colors = dataColors ? dataColors.split(",") : colors)[0],
          lower: colors[1],
        },
      },
    },
    xaxis: { axisBorder: { show: !1 } },
    stroke: { colors: ["#a1a9b1"] },
  };
(chart = new ApexCharts(
  document.querySelector("#horizontal-boxplot"),
  options,
)).render();
