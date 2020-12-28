const express = require("express");
var http = require("http");
var bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req, res) {

    

    const url = "http://api.openweathermap.org/data/2.5/weather?q=paris&appid=4b01458a2b74d57ff37f136f382ac4d5&units=metric";

    http.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const name = weatherData.name;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Weather is currently "+weatherDiscription+"</p>");
            res.write("<h1>The Temprature in "+name+" is "+temp+" degree celcius</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    });
})


app.get("/city", function(req, res) {
     res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res) {
    console.log(req.body.city);
    const cityName = req.body.city;
    const appKey = "4b01458a2b74d57ff37f136f382ac4d5";
    const unit = "metric";
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appKey+"&units="+unit+"";

    http.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) { 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const name = weatherData.name;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Weather is currently "+weatherDiscription+"</p>");
            res.write("<h1>The Temprature in "+name+" is "+temp+" degree celcius</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    });
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})