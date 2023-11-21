function hexToRGB(o, i) {
  var l = parseInt(o.slice(1, 3), 16),
    t = parseInt(o.slice(3, 5), 16),
    o = parseInt(o.slice(5, 7), 16);
  return i
    ? "rgba(" + l + ", " + t + ", " + o + ", " + i + ")"
    : "rgb(" + l + ", " + t + ", " + o + ")";
}
$(document).ready(function () {
  function i() {
    var o = $("#sparkline1").data("colors"),
      i = o ? o.split(",") : r.concat();
    $("#sparkline1").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40], {
      type: "line",
      width: "100%",
      height: "165",
      chartRangeMax: 50,
      lineColor: i[0],
      fillColor: hexToRGB(i[0], 0.3),
      highlightLineColor: "rgba(0,0,0,.1)",
      highlightSpotColor: "rgba(0,0,0,.2)",
      maxSpotColor: !1,
      minSpotColor: !1,
      spotColor: !1,
      lineWidth: 1,
    }),
      $("#sparkline1").sparkline([25, 23, 26, 24, 25, 32, 30, 24, 19], {
        type: "line",
        width: "100%",
        height: "165",
        chartRangeMax: 40,
        lineColor: i[1],
        fillColor: hexToRGB(i[1], 0.3),
        composite: !0,
        highlightLineColor: "rgba(0,0,0,.1)",
        highlightSpotColor: "rgba(0,0,0,.2)",
        maxSpotColor: !1,
        minSpotColor: !1,
        spotColor: !1,
        lineWidth: 1,
      }),
      (i = (o = $("#sparkline2").data("colors")) ? o.split(",") : r.concat()),
      $("#sparkline2").sparkline(
        [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
        {
          type: "bar",
          height: "165",
          barWidth: "10",
          barSpacing: "3",
          barColor: i,
        },
      ),
      (i = (o = $("#sparkline3").data("colors")) ? o.split(",") : r.concat()),
      $("#sparkline3").sparkline([20, 40, 30, 10], {
        type: "pie",
        width: "165",
        height: "165",
        sliceColors: i,
      }),
      (i = (o = $("#sparkline4").data("colors")) ? o.split(",") : r.concat()),
      $("#sparkline4").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40], {
        type: "line",
        width: "100%",
        height: "165",
        chartRangeMax: 50,
        lineColor: i[0],
        fillColor: "transparent",
        lineWidth: 2,
        highlightLineColor: "rgba(0,0,0,.1)",
        highlightSpotColor: "rgba(0,0,0,.2)",
        maxSpotColor: !1,
        minSpotColor: !1,
        spotColor: !1,
      }),
      $("#sparkline4").sparkline([25, 23, 26, 24, 25, 32, 30, 24, 19], {
        type: "line",
        width: "100%",
        height: "165",
        chartRangeMax: 40,
        lineColor: i[1],
        fillColor: "transparent",
        composite: !0,
        lineWidth: 2,
        maxSpotColor: !1,
        minSpotColor: !1,
        spotColor: !1,
        highlightLineColor: "rgba(0,0,0,1)",
        highlightSpotColor: "rgba(0,0,0,1)",
      }),
      (i = (o = $("#sparkline6").data("colors")) ? o.split(",") : r.concat()),
      $("#sparkline6").sparkline(
        [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
        {
          type: "line",
          width: "100%",
          height: "165",
          lineColor: "#e3eaef",
          lineWidth: 2,
          fillColor: "rgba(227,234,239,0.3)",
          highlightLineColor: "rgba(0,0,0,.1)",
          highlightSpotColor: "rgba(0,0,0,.2)",
        },
      ),
      $("#sparkline6").sparkline(
        [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
        {
          type: "bar",
          height: "165",
          barWidth: "10",
          barSpacing: "5",
          composite: !0,
          barColor: "#6c757d",
        },
      ),
      (i = ["#6c757d"]),
      (o = $("#sparkline7").data("colors")) && (i = o.split(",")),
      $("#sparkline7").sparkline(
        [
          4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 6, 3, 4, 5, 8, 7, 6, 9, 3, 2, 4, 1,
          5, 6, 4, 3, 7,
        ],
        { type: "discrete", width: "280", height: "165", lineColor: i },
      );
  }
  function l() {
    function l() {
      var o,
        i = new Date().getTime();
      t &&
        t != i &&
        ((o = Math.round((a / (i - t)) * 1e3)),
        n.push(o),
        30 < n.length && n.splice(0, 1),
        (a = 0),
        $("#sparkline5").sparkline(n, {
          tooltipSuffix: " pixels per second",
          type: "line",
          width: "100%",
          height: "165",
          chartRangeMax: 77,
          maxSpotColor: !1,
          minSpotColor: !1,
          spotColor: !1,
          lineWidth: 1,
          lineColor: "#fa5c7c",
          fillColor: "rgba(250, 92, 124, 0.3)",
          highlightLineColor: "rgba(24,147,126,.1)",
          highlightSpotColor: "rgba(24,147,126,.2)",
        })),
        (t = i),
        setTimeout(l, 500);
    }
    var t,
      r = -1,
      e = -1,
      a = 0,
      n = [];
    $("html").mousemove(function (o) {
      var i = o.pageX,
        o = o.pageY;
      -1 < r && (a += Math.max(Math.abs(i - r), Math.abs(o - e))),
        (r = i),
        (e = o);
    }),
      setTimeout(l, 500);
  }
  var t,
    r = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
  i(),
    l(),
    $(window).resize(function (o) {
      clearTimeout(t),
        (t = setTimeout(function () {
          i(), l();
        }, 300));
    });
});