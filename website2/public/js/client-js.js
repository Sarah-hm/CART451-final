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

let popupOpenTimeOut = setTimeout(openPopup, 3000);

$(".close-pop-up").click(function(){
if($(this).parent().hasClass("isOpened")){
    $(this).parent().removeClass("isOpened")
    $(this).parent().addClass("isClosed")
    setTimeout(()=>{
        $(this).parent().removeClass("isClosed")
        $(this).parent().addClass("isOpened")
    }, 5000)
}else if($(this).parent().hasClass("isClosed")){
    $(this).parent().removeClass("isClosed")
    $(this).parent().addClass("isOpened")
}
})

  function openPopup(){
$(".pop-up").removeClass("isClosed")
$(".pop-up").addClass("isOpened")
}
//get countdown to midnight
//from: https://stackoverflow.com/questions/54256629/countdown-to-midnight-refresh-every-day
const Countdown = (() => {

let nextMidnight = new Date();
nextMidnight.setHours(24,0,0,0);

const getRemainingTime = () => {
let now = new Date();

let time = (nextMidnight.getTime() - now.getTime())/1000;

if(time < 0) {
nextMidnight = new Date();
nextMidnight.setHours(24,0,0,0);

return getRemainingTime();
}

return time;
}

const parseTime = (time) => {
const hours = Math.floor(time/3600);
let rest = time-(hours*3600);
const minutes = Math.floor(rest/60);
rest = rest-(minutes*60);
const seconds = Math.floor(rest);
const milliseconds = (rest-seconds)*1000;

return [hours, minutes, seconds, milliseconds];
};

const formatTime = (parsedTime) => {
return '<span class="hours">' + parsedTime[0] + '</span><span class="hSep">:</span><span class="minutes">' + ("0" + parsedTime[1]).slice(-2) + '</span><span class="mSep">:</span><span class="seconds">' + ("0" + parsedTime[2]).slice(-2) + '</span>';
};

const els = [];
let timeout;

return (el) => {
els.push(el);

if(!timeout) {

const refresh = () => {
  const parsedTime = parseTime(getRemainingTime());
  const formattedTimes = formatTime(parsedTime);
  
  for(let i = 0, iend = els.length; i < iend; i++) {
    els[i].innerHTML = formattedTimes;
  }
  
  setTimeout(() => {
    refresh();
  }, parsedTime[3]);
};
refresh();

}
else el.innerHTML = formatTime(parseTime(getRemainingTime()));
};

})();
Countdown(document.getElementById('countdown'));