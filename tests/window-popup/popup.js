$(document).ready(function(){

    let popupContainer= document.querySelector(".popupContainer");
    let popupContainerwidth = popupContainer.offsetWidth;
    let popupContainerheight = popupContainer.offsetHeight;

    let popupWindowWidth = popupContainerwidth/2;
    let popupWindowHeight = popupContainerheight/2;
   
let zIndex = 10; 

let messages = ["hello", "hello again", "this is a third message", "final message"]

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
//}


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
})