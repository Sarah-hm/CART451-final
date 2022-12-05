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

     let stringResponse = JSON.stringify(response);
     console.log(stringResponse);
     console.log(response.ip);
     document.getElementById("infoBox").innerHTML = `<br> ${response.ip} <br> ${response.district} <br> ${response.isp} <br>`;
      messages.push(stringResponse);
    

      //  console.log(response);
      let latitude = response.latitude; 
      let longitude = response.longitude;
     
       let map;
       let infoWindow = new google.maps.InfoWindow();

       //put everything in the map html element with coordinates; 
      initMap(latitude, longitude);


      //=====INITIALIZE ALL GOOGLE MAP AND REVERSE GEOCODING ======
       function initMap(latitude, longitude) {

        // console.log(latitude, longitude);

        //SET UP GOOGLE MAP BIRDS POV
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          zoom: 15,
        });
      

        //SET UP STREET VIEW
        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            pov: {
              heading: 34,
              pitch: 10,
            },
          }
        );
        map.setStreetView(panorama);
       
      //PULL ADDRESS
      let geocoder = new google.maps.Geocoder();
        // console.log({ lat: parseFloat(latitude), lng: parseFloat(longitude)});
      geocoder
      .geocode({location: { lat: parseFloat(latitude), lng: parseFloat(longitude)}})
      .then((response) => {

        if (response.results[0]) {
  
          console.log(response);

          document.getElementById("infoBox2").innerHTML = `<br> ${response.results[0].formatted_address} <br> ${response.results[0].types}`;

          
          // const marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map,
          // });
  
          // infoWindow.setContent(response.results[0].formatted_address);
          // infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
          
      }//initMap


   return messages;
    }) //get geoloc



 // ==== create pop up windows ==== 
 
 let popupContainer= document.querySelector(".popupContainer");
 let popupContainerwidth = popupContainer.offsetWidth;
 let popupContainerheight = popupContainer.offsetHeight;

 let popupWindowWidth = popupContainerwidth/2;
 let popupWindowHeight = popupContainerheight/2;

let zIndex = 10; 



//for (let i = 0; i< messages.length; i++){
// console.log(messages[i])
 //setInterval(createNewPopup,1000, messages, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, i, zIndex,count); 
let count = -1;
let newPopUpCounter = messages.length;

 let idofInterval = setInterval(function(){
     count =count+1;
     console.log(count);
     if(count<messages.length){
         createNewPopup(messages, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,count);
     }
     else{
         clearInterval(idofInterval);
     }

 },1000);


function createNewPopup(popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,i){

 let popupXpos = Math.floor(Math.random() * popupContainerwidth) - popupWindowWidth/2
 let popupYpos = Math.floor(Math.random() * popupContainerheight) - popupWindowHeight/2


 let popupWidth = getRandomInt(popupWindowWidth-50, popupWindowWidth+50);
 let popupHeight = getRandomInt(popupWindowHeight-50, popupWindowHeight+50);

 //create a new popup at a random location on the screen 
 $(".popupContainer").append(`
 <div class = "popupWindow" id = "popup${i}"> 
 <div class = popupBanner> 
 <button id= "button-popup${i}" = "bannerButtonClose">X</button>
 <button class = "bannerButtonMin">_</button>
 <button class = "bannerButtonMax">▢</button>
 </div>
 <div class = "popupMessage">
 ${popupMessage[i]}
 </div>
 </div>`)



 $(`#popup${i}`).css("top",`${popupYpos}px`);
 $(`#popup${i}`).css("left",`${popupXpos}px`);
 $(`#popup${i}`).css("z-index",`${zIndex}`);
 $(`#popup${i}`).css("width",`${popupWidth}px`);
 $(`#popup${i}`).css("height",`${popupHeight}px`);


 //increment the index and zindex by one
 zIndex++;

 $(`#button-popup${i}`).on( "click", function() {
     console.log($(this));
 
   // console.log($(this).parent().parent().find(".popupMessage").html()) 
   newPopUpCounter+=1;
    let newpopupMessage = $(this).parent().parent().find(".popupMessage").html()
    //console.log(newpopupMessage)
    //settimeout to resend the information from the popup to be created in a new popup;
    $(this).parent().parent().remove();
    setTimeout(createNewNewPopup, 4000, newpopupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,newPopUpCounter)
   });




 

//  setTimeout(createNewPopup,3000, popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, i, zIndex)
}





function createNewNewPopup(popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,i){

 let popupXpos = Math.floor(Math.random() * popupContainerwidth) - popupWindowWidth/2
 let popupYpos = Math.floor(Math.random() * popupContainerheight) - popupWindowHeight/2


 let popupWidth = getRandomInt(popupWindowWidth-50, popupWindowWidth+50);
 let popupHeight = getRandomInt(popupWindowHeight-50, popupWindowHeight+50);

 //create a new popup at a random location on the screen 
 $(".popupContainer").append(`
 <div class = "popupWindow" id = "popup${i}"> 
 <div class = popupBanner> 
 <button class = "bannerButtonClose">X</button>
 <button class = "bannerButtonMin">_</button>
 <button class = "bannerButtonMax">▢</button>
 </div>
 <div class = "popupMessage">
 ${popupMessage}
 </div>
 </div>`)



 $(`#popup${i}`).css("top",`${popupYpos}px`);
 $(`#popup${i}`).css("left",`${popupXpos}px`);
 $(`#popup${i}`).css("z-index",`${zIndex}`);
 $(`#popup${i}`).css("width",`${popupWidth}px`);
 $(`#popup${i}`).css("height",`${popupHeight}px`);


 //increment the index and zindex by one
 zIndex++;


 $(".bannerButtonClose").on( "click", function() {
   // console.log($(this).parent().parent().find(".popupMessage").html()) 
   newPopUpCounter+=1;
    let newpopupMessage = $(this).parent().parent().find(".popupMessage").html()
    console.log(newpopupMessage)
    //settimeout to resend the information from the popup to be created in a new popup;
    $(this).parent().parent().remove();
    setTimeout(createNewNewPopup, 4000, newpopupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, zIndex,newPopUpCounter)
   });

 

//  setTimeout(createNewPopup,3000, popupMessage, popupContainerwidth, popupContainerheight, popupWindowWidth, popupWindowHeight, i, zIndex)
}

function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}   



 

 };
