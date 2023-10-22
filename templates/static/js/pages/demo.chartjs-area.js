function hexToRGB(e, a) {
  var t = parseInt(e.slice(1, 3), 16),
    o = parseInt(e.slice(3, 5), 16),
    e = parseInt(e.slice(5, 7), 16);
  return a
    ? "rgba(" + t + ", " + o + ", " + e + ", " + a + ")"
    : "rgb(" + t + ", " + o + ", " + e + ")";
}
!(function (t) {
  "use strict";
  function e() {
    (this.$body = t("body")),
      (this.charts = []),
      (this.defaultColors = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"]);
  }
  (e.prototype.boundariesExample = function () {
    var e = document.getElementById("boundaries-example"),
      a = e.getAttribute("data-colors"),
      a = a ? a.split(",") : this.defaultColors,
      e = e.getContext("2d"),
      e = new Chart(e, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Fully Rounded",
              data: [12.5, -19.4, 14.3, -15, 10.8, -10.5],
              borderColor: a[0],
              backgroundColor: hexToRGB(a[0], 0.3),
              fill: !1,
            },
          ],
        },
        options: {
          responsive: !0,
          maintainAspectRatio: !1,
          plugins: { legend: { display: !1, position: "top" } },
          scales: {
            x: { grid: { display: !1, color: "#91a6bd40" } },
            y: { grid: { display: !1 } },
          },
        },
      });
    this.charts.push(e);
  }),
    (e.prototype.datasetExample = function () {
      var e = document.getElementById("dataset-example"),
        a = e.getAttribute("data-colors"),
        a = a ? a.split(",") : this.defaultColors,
        e = e.getContext("2d"),
        e = new Chart(e, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "March", "April", "May", "June"],
            datasets: [
              {
                label: "D0",
                data: [10, 20, 15, 35, 38, 24],
                borderColor: a[0],
                hidden: !0,
                backgroundColor: hexToRGB(a[0], 0.3),
              },
              {
                label: "D1",
                data: [12, 18, 18, 33, 41, 20],
                borderColor: a[1],
                fill: "-1",
                backgroundColor: hexToRGB(a[1], 0.3),
              },
              {
                label: "D2",
                data: [5, 25, 20, 25, 28, 14],
                borderColor: a[2],
                fill: 1,
                backgroundColor: hexToRGB(a[2], 0.3),
              },
              {
                label: "D3",
                data: [12, 45, 15, 35, 38, 24],
                borderColor: a[3],
                fill: "-1",
                backgroundColor: hexToRGB(a[3], 0.3),
              },
            ],
          },
          options: {
            responsive: !0,
            maintainAspectRatio: !1,
            plugins: { filler: { propagate: !1 } },
            interaction: { intersect: !1 },
            scales: {
              x: { grid: { display: !1, color: "rgba(0,0,0,1)" } },
              y: { stacked: !0, grid: { display: !1 } },
            },
          },
        });
      this.charts.push(e);
    }),
    (e.prototype.drawTimeExample = function () {
      var e = document.getElementById("draw-time-example"),
        a = e.getAttribute("data-colors"),
        a = a ? a.split(",") : this.defaultColors,
        e = e.getContext("2d"),
        e = new Chart(e, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "March", "April", "May", "June"],
            datasets: [
              {
                label: "Fully Rounded",
                data: [10, 20, 15, 35, 38, 24],
                borderColor: a[0],
                backgroundColor: a[0],
                fill: !0,
              },
              {
                label: "Small Radius",
                data: [24, 38, 35, 15, 20, 10],
                backgroundColor: hexToRGB(a[1], 0.3),
                borderColor: a[1],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: !0,
            maintainAspectRatio: !1,
            plugins: { legend: { display: !1 }, filler: { propagate: !1 } },
            pointBackgroundColor: "#fff",
            radius: 5,
            interaction: { intersect: !1 },
            scales: {
              x: { grid: { display: !1 } },
              y: { grid: { display: !1 } },
            },
          },
        });
      this.charts.push(e);
    }),
    (e.prototype.stackedExample = function () {
      var e = document.getElementById("stacked-example"),
        a = e.getAttribute("data-colors"),
        a = a ? a.split(",") : this.defaultColors,
        e = e.getContext("2d"),
        e = new Chart(e, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "March", "April", "May", "June"],
            datasets: [
              {
                label: "D0",
                data: [10, 20, 15, 35, 38, 24],
                borderColor: a[0],
                fill: !0,
                backgroundColor: a[0],
              },
              {
                label: "D1",
                data: [12, 18, 18, 33, 41, 20],
                borderColor: a[1],
                fill: !0,
                backgroundColor: a[1],
              },
              {
                label: "D2",
                data: [5, 25, 20, 25, 28, 14],
                borderColor: a[2],
                fill: !0,
                backgroundColor: a[2],
              },
              {
                label: "D3",
                data: [12, 45, 15, 35, 38, 24],
                borderColor: a[3],
                fill: !0,
                backgroundColor: a[3],
              },
              {
                label: "D4",
                data: [24, 38, 35, 15, 20, 10],
                borderColor: a[4],
                fill: !0,
                backgroundColor: a[4],
              },
            ],
          },
          options: {
            responsive: !0,
            maintainAspectRatio: !1,
            plugins: { legend: { display: !1 } },
            interaction: { mode: "nearest", axis: "x", intersect: !1 },
            scales: {
              x: {
                title: { display: !0, text: "Month" },
                grid: { display: !1 },
              },
              y: {
                stacked: !0,
                title: { display: !0, text: "Value" },
                grid: { display: !1 },
              },
            },
          },
        });
      this.charts.push(e);
    }),
    (e.prototype.radarExample = function () {
      var e = document.getElementById("radar-example"),
        a = e.getAttribute("data-colors"),
        a = a ? a.split(",") : this.defaultColors,
        e = e.getContext("2d"),
        e = new Chart(e, {
          type: "radar",
          data: {
            labels: ["Jan", "Feb", "March", "April", "May", "June"],
            datasets: [
              {
                label: "D0",
                data: [10, 20, 15, 35, 38, 24],
                borderColor: a[0],
                fill: "-1",
                backgroundColor: hexToRGB(a[0], 0.3),
              },
              {
                label: "D1",
                data: [12, 18, 18, 33, 41, 20],
                borderColor: a[1],
                fill: !1,
                backgroundColor: hexToRGB(a[1], 0.3),
              },
              {
                label: "D2",
                data: [5, 25, 20, 25, 28, 14],
                borderColor: a[2],
                fill: "-1",
                backgroundColor: hexToRGB(a[2], 0.3),
              },
              {
                label: "D3",
                data: [12, 45, 15, 35, 38, 24],
                borderColor: a[3],
                fill: "-1",
                backgroundColor: hexToRGB(a[3], 0.3),
              },
            ],
          },
          options: {
            responsive: !0,
            maintainAspectRatio: !1,
            plugins: { legend: { display: !1 }, filler: { propagate: !1 } },
          },
        });
      this.charts.push(e);
    }),
    (e.prototype.init = function () {
      var a = this;
      (Chart.defaults.font.family =
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'),
        (Chart.defaults.color = "#8391a2"),
        (Chart.defaults.borderColor = "rgba(133, 141, 152, 0.1)"),
        this.boundariesExample(),
        this.datasetExample(),
        this.drawTimeExample(),
        this.stackedExample(),
        this.radarExample(),
        t(window).on("resizeEnd", function (e) {
          t.each(a.charts, function (e, a) {
            try {
              a.destroy();
            } catch (e) {}
          }),
            a.boundariesExample(),
            a.datasetExample(),
            a.drawTimeExample(),
            a.stackedExample(),
            a.radarExample();
        }),
        t(window).resize(function () {
          this.resizeTO && clearTimeout(this.resizeTO),
            (this.resizeTO = setTimeout(function () {
              t(this).trigger("resizeEnd");
            }, 500));
        });
    }),
    (t.ChartJs = new e()),
    (t.ChartJs.Constructor = e);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.ChartJs.init();
  })();
