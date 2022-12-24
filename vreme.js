const express = require("express");
const https = require('https');  // vec je deo NODE.JS tako da nemoramo da instaliramo nista u Hyper terminalu
const bodyParser = require('body-parser')  // nam pomaze da uzmemo html i kontrolisemo putem Js-a
// Kazu da ne treba da se skine bodyParser ima ga u expressu
        // probaj SL put

const app = express();                   // npm i body-parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req,res){  // <----sta treba da se desi kada browser ulazi u kontakt sa serverom
res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res) { // accept someone to post something in you website
  // console.log(req.body.City);  // logujem sta pisem sa ovim u htmlu input tagu
  const grad = req.body.City;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + grad + "&units=metric&appid=b26b2a7c76b0e5db262b4a10a502cdc1#";

  https.get(url, function(response) {  // pretvaramo API link u nesto sto mozemo da koristimo
    // response daje sve informacije koje dobijamo iz linka
    // zato sto je u app.post on nam daje info samo kada uradimo to nesto
    // o ovom slucaju kliknemo dugme
    console.log(response.statusCode);

    response.on("data", function(data) {
     const vreme = JSON.parse(data)          // ovde trazimo data koji nam daje api i pretvaramo ga u citajucu formu
    //  console.log(vreme);   // ovde logujemo sve infomacije koje nam pruza api
     const temperatura = vreme.main.temp;    // pronalazimo u DOM gde je temperatura i izdvajamo
     console.log("Temperatura je " + temperatura);             // logujemo temperaturu
     const oblaci = vreme.weather[0].description
     console.log(oblaci);                            // ne moram da pravim vise response.on da bih izvukao vise informacija

     const ikonica = vreme.weather[0].icon
    const imgURL = "http://openweathermap.org/img/wn/"+ ikonica +"@2x.png"
res.write("<h1>temperatura je "  + temperatura + " C</h1>");
res.write("<h1>napolju je "  + oblaci + "</h1>");   // mozemo da imamo vise res.write
  res.write("<img src=" + imgURL + ">");
 });

})  // isto mozemo kao sto ovde unpack radimo na kodu mozemo da ga pakujemo
    //JSON.stringify(data);

 // res.send()    // mozemo samo jedan send da postavimo ne moze vise
});
app.listen(3000, function() {
  console.log("Server is running");
});

// za buducnost
// ako zelim da narpavim dugme u htmlu da se vratim nazad na glavnu starnu
// html -->
//
//  <form action="/nazad" method="post">
/// <button type="submit" name="button"></button>
//  </form>

// --- Js
//app.post("/nazad", function(req,res) {
// res.redirect("/")
// })
// da odemo nazad
//
