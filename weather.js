const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/city", function (req, res) {
  res.sendFile(__dirname + "/secondPage.html");
});

app.post("/", function (req, res) {
  const city = req.body.City;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=b26b2a7c76b0e5db262b4a10a502cdc1#";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const vreme = JSON.parse(data);
      const temp = vreme.main.temp;

      const typeOfWeather = vreme.weather[0].description;

      const icon = vreme.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1> Current temperature is " +
          temp +
          " C</h1><h2>Outside is " +
          typeOfWeather +
          "</h2><img src=" +
          imgURL +
          ">"
      );
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running");
});
