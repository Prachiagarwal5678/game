//alert("hi");
var colours= ["red","blue","green","yellow"];
var pattern=[];
var userpattern=[];
var level=0;
function animate(randomchoose)
{
    $("#"+randomchoose).fadeIn(100).fadeOut(100).fadeIn(100);
}
function play(randomchoose)
{
  var audio=new Audio('sounds/' +randomchoose+ '.mp3');
  audio.play();
}

function animatepress(userchoice)
{
    $("#"+userchoice).addClass("pressed");
    setTimeout(function(){
      $("#"+userchoice).removeClass("pressed");
    },100);
}

function nextsequence()
{
  var random=Math.floor(Math.random()*4);
  var randomchoose=colours[random];
  pattern.push(randomchoose);
  animate(randomchoose);
  play(randomchoose);
  $("#level-title").text("Level "+level);
  level++;
  userpattern=[];
}

function check()
{
  var i;
  var flag=true;
  for(i=0;i<pattern.length;i++)
{
  if(pattern[i]===userpattern[i])
  continue;
  else
  flag=false;
}
if(flag&&i===(pattern.length))
{
    setTimeout(function(){
      nextsequence();  },1000);
}
else{
  var audio=new Audio('sounds/wrong.mp3');
  audio.play();
  setTimeout(function(){
    $(document).addClass("game-over");  },200);
       $("#level-title").text('Game Over');
       startover();
       setTimeout(function(){
       $("#level-title").text('Press A Key to Start'); },2000);
}
}
function startover()
{
  level=0;
  started=true;
  pattern=[];
   userpattern=[];
}

var started=true;
$(document).keypress(function(){
  if(started===true)
  {
    nextsequence();
    started=false;
  }
})

$( ".btn" ).click(function() {

 var userchoice=this.id;
 userpattern.push(userchoice);
 play(userchoice);
 animatepress(userchoice);

 if(userpattern.length===pattern.length)
 check();
 else{
   for(i=0;i<userpattern.length;i++)
   if(pattern[i]!=userpattern[i])
   {
     var audio=new Audio('sounds/wrong.mp3');
     audio.play();
     setTimeout(function(){
       $(document).addClass("game-over");  },200);
          $("#level-title").text('Game Over');
          startover();

          setTimeout(function(){
          $("#level-title").text('Press A Key to Start'); },2000);

   }
 }
});
