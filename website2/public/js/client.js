window.onload = function () {
  console.log("we are loaded");

//create one popup window

setTimeout(createNewPopup, 1000);

function createNewPopup(){
  console.log("we create a new popup")
  let i = 1;
  let popupString = "this is popup number 1"
  let zIndex = i + 5;
  let newPopupElement = `<div class = "popupWindow" id = "popup${i}" style="z-index:${zIndex};"> ${popupString}</div>`
  $(".page").append(newPopupElement)
  console.log("we have created a new popup")
}




//GET AND DISPLAY IP API INFORMATION (google maps, address, ...)
  $.get(
    "/geoLoc",
   // if we get a response from the server .... 
    function(response) {

        //DISPLAY ALL OTHER IP information; 
     console.log("new console");
     console.log(response.ip);
     document.getElementById("infoBox").innerHTML = `<br> ${response.ip} <br> ${response.district} <br> ${response.isp} <br>`;


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


   
    })



 

 };
