const express = require("express");
const http = require("http");
const server = express();

// Middlewares
server.use(express.json());

// Define your API route for stats
server.get("/api/stats", function (req, res) {
  var options = {
    host: process.env.STATS_API_HOST,
    path: "/stats",
    method: "GET",
  };
  const val = req.get("kubernetes-route-as");
  if (val) {
    console.log("Forwarding kubernetes-route-as header value - %s", val);
    options.headers = {
      "kubernetes-route-as": val,
    };
  }
  var req = http.request(options, function (statResponse) {
    res.setHeader("Content-Type", "application/json");
    var responseString = "";
    statResponse.on("data", function (chunk) {
      responseString += chunk;
    });
    statResponse.on("end", function () {
      res.send(responseString);
    });
  });

  req.on("error", function (e) {
    console.log("Problem with request: " + e.message);
    res.status(500).send("Error making internal request");
  });

  req.end();
});

// Root route
server.get("/", function (req, res) {
  res.send("Welcome to the Debug Kubernetes API!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
