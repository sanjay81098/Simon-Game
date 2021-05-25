var buttonColors=["red", "blue","green","yellow"];
var gamePattern=[]    // orignal sequence of colors
var userClickedPattern = []; // user Response

var started=false;
var level =0;

$(document).keydown(function(){
  if(started===false)
  {
   // $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
})

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(len)
{

  if(gamePattern[len]===userClickedPattern[len])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    
  }

  else 
  {
    
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    started=false;
    level=0;
    gamePattern=[];
  }
  
}

function nextSequence()
{

  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  
}

function playSound(name)
{
  var audioPath="/sounds/"+name+".mp3";
  var audio = new Audio(audioPath);
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}