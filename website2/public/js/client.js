window.onload = function () {
  console.log("we are loaded");


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








 document.querySelector("#searchGeolocation").addEventListener('click', function(event){
  $.get(
    "/testData",
    {paramOne : "extraData"},


   // if we get a response from the server .... 
    function(response) {
      //  console.log(response);

       $("#parentContainer").css("background-color","black");
})

 })


 




//   //GET
//   document.querySelector("#findData").addEventListener('click', function(event){

//     let searchCrit =   document.getElementById("searchCrit").value;
//     $.get(
//       "/varsToMongo",
//       {paramOne : searchCrit},
//      // if we get a response from the server .... 
//       function(response) {
//          console.log(response);
         
//   })
// });//click

//   //POST NOTE this is specific for airbnb data set - you change according to your wishes!
//   document.querySelector("#sendData").addEventListener('click', 
//     function(event){
//       event.preventDefault();
//       console.log("clicked");
//       let mData={
//         host_name:document.querySelector("#host_name").value,
//         nbgn_grp:document.querySelector("#neighbour_hood_group").value
      
//       };
//       console.log(mData);


//       /*** request ***/
//     $.ajax({
//                type: "POST",
//                data: JSON.stringify(mData),
//                url:'/postForm',
//                processData: false,
//                contentType: "application/json",
//                cache: false,
//                timeout: 600000,
//                success: function (response) {
//                //reponse is a STRING
//                console.log("we had success!");
//                console.log(response);
              
//               },
//               error:function(e){
//             console.log(e);
//              console.log("error occurred");

//            }
//          });


//   });//click
 };
