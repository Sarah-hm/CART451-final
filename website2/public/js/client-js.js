 //change menu bar when scrolling  
 var lastScrollTop = 0, delta = 5;
 $(window).scroll(function(){
     var nowScrollTop = $(this).scrollTop();
     if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
         if (nowScrollTop > lastScrollTop){
             // console.log("scrolling down")
             $(".menu-bar").css("height","10vh");
         } else {
             // ACTION ON
            //  console.log("scrolling up")
             $(".menu-bar").css("height","20vh");
        }
     lastScrollTop = nowScrollTop;
     }
 });




//close/open pop-up


// let popupOpenTimeOut = setTimeout(openPopup, 3000);

// $(".close-pop-up").on("click",function(){
// console.log("close pop up is clicked")
// if($(this).parent().hasClass("isOpened")){
//   console.log("parent is opened")
//     $(this).parent().removeClass("isOpened")
//     $(this).parent().addClass("isClosed")
//     setTimeout(()=>{
//         $(this).parent().removeClass("isClosed")
//         $(this).parent().addClass("isOpened")
//     }, 5000)
// }else if($(this).parent().hasClass("isClosed")){
//   console.log("parent is closed")
//     $(this).parent().removeClass("isClosed")
//     $(this).parent().addClass("isOpened")
// }
// })

//   function openPopup(){
// $(".pop-up").removeClass("isClosed")
// $(".pop-up").addClass("isOpened")
//   }