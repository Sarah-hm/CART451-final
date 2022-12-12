window.onload = function () {
  console.log("we are loaded");

  let messages = [];

//GET AND DISPLAY IP API INFORMATION (google maps, address, ...)

  $.get(
    "/geoLoc",
   // if we get a response from the server .... 
    function(response) {

        //DISPLAY ALL OTHER IP information; 
     console.log("new console");

     
     let map;
     let infoWindow = new google.maps.InfoWindow();

     //Filter response through which popup is going to show specific information

     //== timezone message ==
      let currentTime = response.time_zone.current_time; 
      let currentUnix = JSON.stringify(response.time_zone.current_time_unix);
      let timezoneName = response.time_zone.name
      let timezoneOffset = response.time_zone.offset

      let timezoneMessage = `<h2>your current time:</h2>${currentTime} <br> <h2>seconds since 1970 jan 1 (unix):</h2> ${currentUnix} <br> timezome: ${timezoneName} <br> offset: ${timezoneOffset} hours`
      
      //== country message ==
      let continentname = response.continent_name;
      let capitalname = response.country_capital; 
      let countryname = response.country_name;
      let currencycode = response.currency.code;
      let currencyname = response.currency.name; 
      let currencysymbol = response.currency.symbol; 
      let countryflagurl = response.country_flag; 

      let countryMessage = `You are in ${countryname} in ${continentname}. ${countryname}'s capital is ${capitalname}. <br> 
      The currency is ${currencyname}(${currencysymbol}/${currencycode}) <br>`

      // == country message == 
      let flagMessage = `
      <div style = "height: 150px; display:flex; align-items:center; justify-content:center;">
      <img src = ${countryflagurl} alt = "${countryname}'s flag" style = "transform: scale(2);">
      </div>
      `

      //wifi provider message
      let wifidistrict = response.district;
      let wifiprovider = response.isp;

      let wifiproviderMessage = `Your wifi provider, ${wifiprovider}, is in ${wifidistrict}`

      //personal message
      let ipadd = JSON.stringify(response.ip)
      let latitude = response.latitude; 
      let longitude = response.longitude;


      let ispMessage = `Your ISP address is ${ipadd}`

      let geoMessage =`Your ISP address points to ${latitude} latitude and ${longitude} longitude`

      let hereMessage = `<h1 class = "bigPopupMessage"> RIGHT HERE </h1>`

      let nopermissionMessage = `<h1> No permissions were required from you to get this information </h1>`

      let emojiMessage = `<h1 class = bigPopupMessage"> 😐</h1>`

     //Push all the different strings in the messages array. Each message will appear on its own popup window 'au fur et a mesure'
     messages.push(flagMessage); 
     messages.push(countryMessage);
     messages.push(timezoneMessage);
     messages.push(wifiproviderMessage);
     messages.push(ispMessage);
     messages.push(geoMessage);
     messages.push("geocode");
     messages.push("googleMapsView");
     messages.push("googleStreetView");
     messages.push(hereMessage);
     messages.push(nopermissionMessage);
     messages.push(emojiMessage)



    

      //  console.log(response);
  

 // ==== create pop up windows ==== 
 
 //Create width/height variable for popup container and popup window based on the current loaded dimension
 let popupContainer= document.querySelector(".popupContainer");
 let popupContainerwidth = popupContainer.offsetWidth;
 let popupContainerheight = popupContainer.offsetHeight;

 let popupWindowWidth = popupContainerwidth/2;
 let popupWindowHeight = 2*(popupContainerheight/3);


 //popups will all be drawn on zindex 10 and +
let zIndex = 10; 

//for (let i = 0; i< messages.length; i++){
// console.log(messages[i])
 //setInterval(createNewPopup,1000, messages, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, i, zIndex,count); 
let count = -1;
let newPopUpCounter = messages.length;
console.log(newPopUpCounter)

 let idofInterval = setInterval(function(){
     count =count+1;
     //console.log(count);
     if(count<messages.length){
         createNewPopup(messages, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,count);
     }
     else{
         clearInterval(idofInterval);
     }

 },2500);

//Creations a new popup for the first time 
function createNewPopup(popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,i){

 let popupXpos = Math.floor(Math.random() * popupContainerwidth) - popupWindowWidth/2
 let popupYpos = Math.floor(Math.random() * popupContainerheight) - popupWindowHeight/2


 let popupWidth = getRandomInt(popupWindowWidth-50, popupWindowWidth+50);
 let popupHeight = getRandomInt(popupWindowHeight-50, popupWindowHeight+50);

 //create a new popup at a random location on the screen 
 $(".popupContainer").append(`
 <div class = "popupWindow" id = "popup${i}"> 
 <div class = popupBanner> 
 <button id= "button-popup${i}" class = "bannerButtonClose">X</button>
 <button class = "bannerButtonMin">_</button>
 <button class = "bannerButtonMax">▢</button>
 </div>
 <div class = "popupMessage" id = "popup-div-${i}">
 ${popupMessage[i]}
 </div>
 </div>`)

 //If popupMessage is google stree view
  if( popupMessage[i]=== "googleStreetView"){
//Create a google street view in the current popup
     //set up street view
     const panorama = new google.maps.StreetViewPanorama(
      document.getElementById(`popup-div-${i}`),
      {
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );
    // map.setStreetView(panorama);
  } 
  //if message is google maps
  else if(popupMessage[i]=== "googleMapsView"){
    //Create the google maps view window in this specific popup
    map = new google.maps.Map(document.getElementById(`popup-div-${i}`), {
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      zoom: 15,
    });
  }
else if (popupMessage[i]==="geocode"){
  let geocoder = new google.maps.Geocoder();
  // console.log({ lat: parseFloat(latitude), lng: parseFloat(longitude)});
geocoder
.geocode({location: { lat: parseFloat(latitude), lng: parseFloat(longitude)}})
.then((response) => {
  // if (response.results[0]) {
  let allAdd = [];
  //console.log(response.results)
    for (let y = 0; y<response.results.length;y++){

      let newAdd = response.results[y].formatted_address; 
     // console.log(newAdd);
      allAdd.push(newAdd+'<br>');
    }
    //console.log(allAdd);
    document.getElementById(`popup-div-${i}`).innerHTML = `<p><code> Closest address infered from IP came from a ${response.results[0].types} situated at <br> ${allAdd} <br> </code></p>`;

 //   document.getElementById(`popup-div-${i}`).innerHTML = `Closest address inferred from IP <br> ${response.results[0].formatted_address} <br> ${response.results[0].types}`;
  // } else {
  //   window.alert("No results found");
  // }
})
.catch((e) => window.alert("Geocoder failed due to: " + e));
}


 $(`#popup${i}`).css("top",`${popupYpos}px`);
 $(`#popup${i}`).css("left",`${popupXpos}px`);
 $(`#popup${i}`).css("z-index",`${zIndex}`);
 $(`#popup${i}`).css("width",`${popupWidth}px`);
 $(`#popup${i}`).css("height",`${popupHeight}px`);


 //increment the index and zindex by one
 zIndex++;

 //If the X button of a popup is clicked, remove the popup and make it reappear after a few seconds
 $(`#button-popup${i}`).on( "click", function() {
   //  console.log($(this));
   //Make it a new popup on the counter
     newPopUpCounter+=1;
   //  console.log(newPopUpCounter);
   // reset the variable
     let newpopupMessage  ='';
     
    //if the message is google street view, just send that
     if (popupMessage[i]=== "googleStreetView"){
      newpopupMessage = "googleStreetView"
     }
    //if the message is google street maps, just send that
     else if(popupMessage[i]=== "googleMapsView"){
      newpopupMessage = "googleMapsView"
     }
    else{
    //if the message is anything else, send the html content of the message
      newpopupMessage = $(this).parent().parent().find(".popupMessage").html()
    }
   
    //remove the popup from html
    $(this).parent().parent().remove();
    //send all of the popup info to a new popup in a few seconds (4)
    setTimeout(createNewNewPopup, 4000, newpopupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,newPopUpCounter)
   });

}



// === Creates a *new* popup for the second time and all other times after that (when the popup has been closed by its X button)
// removes some time from the timeout everytime -> 
function createNewNewPopup(popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,i){

 let popupXpos = Math.floor(Math.random() * popupContainerwidth) - popupWindowWidth/2
 let popupYpos = Math.floor(Math.random() * popupContainerheight) - popupWindowHeight/2


 let popupWidth = getRandomInt(popupWindowWidth-50, popupWindowWidth+50);
 let popupHeight = getRandomInt(popupWindowHeight-50, popupWindowHeight+50);

 //create a new popup at a random location on the screen 
 $(".popupContainer").append(`
 <div class = "popupWindow" id = "popup${i}"> 
 <div class = popupBanner> 
 <button id= "button-popup${i}" class = "bannerButtonClose">X</button>
 <button class = "bannerButtonMin">_</button>
 <button class = "bannerButtonMax">▢</button>
 </div>
 <div class = "popupMessage" id = "popup-div-${i}">
 ${popupMessage}
 </div>
 </div>`)

 if( popupMessage=== "googleStreetView"){

   //SET UP STREET VIEW
   let panorama = new google.maps.StreetViewPanorama(
    document.getElementById(`popup-div-${i}`),
    {
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
} else if(popupMessage=== "googleMapsView"){
  //Create the google maps view window in this specific popup
  map = new google.maps.Map(document.getElementById(`popup-div-${i}`), {
    center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    zoom: 15,
  });

}

 $(`#popup${i}`).css("top",`${popupYpos}px`);
 $(`#popup${i}`).css("left",`${popupXpos}px`);
 $(`#popup${i}`).css("z-index",`${zIndex}`);
 $(`#popup${i}`).css("width",`${popupWidth}px`);
 $(`#popup${i}`).css("height",`${popupHeight}px`);


 //increment the index and zindex by one
 zIndex++;


 //If the X button of a popup is clicked, remove the popup and make it reappear after a few seconds
 $(`#button-popup${i}`).on( "click", function() {
  //  console.log($(this));
  //Make it a new popup on the counter
    newPopUpCounter+=1;
  //  console.log(newPopUpCounter);
  // reset the variable
    let newpopupMessage  ='';
    
   //if the message is google street view, just send that
   if (popupMessage=== "googleStreetView"){
    newpopupMessage = "googleStreetView"
   }
  //if the message is google street maps, just send that
   else if(popupMessage=== "googleMapsView"){
    newpopupMessage = "googleMapsView"
   }
  //if the message is anything else, send the html content of the message
   else{
     newpopupMessage = $(this).parent().parent().find(".popupMessage").html()
   }
    //remove the popup html element
    $(this).parent().parent().remove();
   //send all of the popup info to a new popup in a few seconds (4)
   
    setTimeout(createNewNewPopup, 4000, newpopupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,newPopUpCounter)
   });

}

//modular function to get random integer between two values on mdn web docs :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}   


}) //get geoloc
 

 };
