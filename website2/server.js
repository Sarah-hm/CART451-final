const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);
require("dotenv").config();

const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

let ipgeolocationApi = new IPGeolocationAPI("5ab16f95acb945ddba1dc12659f0b948", true)

//const mongoose = require("mongoose");

let bodyParser = require('body-parser');
const { resolve } = require("path");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/testData',handleGetVars);
app.use('/geoLoc',handleGeo);

//const url = process.env.MONGODB_URI;
//console.log(url);
//const FashionModel = require("./DBSchema.js");

//connect to db
// mongoose.connect(url);
// let db = mongoose.connection;
// db.once("open", async function(){
//   console.log("are here");
//   FashionModel.find({gender: "Women", masterCategory: "Personal Care"}).then((result) => {
//     console.log(result);
//   })
// })

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});
// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));
app.use("/client", clientRoute);
//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  console.log("hello");
  //Get the IP address
 


 //Create a google maps iframe based on longitude/latitude;

  // console.log(req.ip);
  // console.log(req.connection.remoteAddress)
  res.sendFile(__dirname + "/public/client.html");

}

/// use this VERB for getting posted data... 9
// app.post('/postForm',handlePost);
 
// the callback
// function handlePost(request,response){
//   console.log(request.body);
  // response.send("SUCCESS POST");

// }

//EXAMPLE of  user making a query ... 10
async function  handleGetVars  (request,response,next){
  console.log(request.url);
  console.log(request.query.paramOne);
  response.send("SUCCESS GET");

}

async function  handleGeo  (request,response,next){
let result = ipgeolocationApi.getGeolocation(
  function(res){
  handleGeoAPIResponse(res).then((result)=>{
    console.log(result);
    response.send(result);

  })
  })

}

function handleGeoAPIResponse(json) {
  return new Promise((resolve,reject) =>{
 // console.log(json);
//  console.log(json);


 //if you can't get the latitude/longitude, choose Plan B (city, quartier)
 // console.log(latitude, longitude);
// console.log({lat: latitude, long:longitude});
 resolve(json);

  })
 
}


// ===== everything auth0 and social media logins ====== 

//Configure auth0 router and authentification keys
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'd6f3e1a0f913344ac11928ab2e69db3aa2e4a16e7bf6e56d4cc74af81840147f',
  baseURL: 'http://localhost:4200',
  clientID: 'DERCmClxoe2yon43TqtY9LGhOcadae1N',
  issuerBaseURL: 'https://dev-567ubgavyfpt3loq.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


