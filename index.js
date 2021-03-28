var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var clickedButton=$(this).attr("id");
  userClickedPattern.push(clickedButton);
  playSound(clickedButton);
  animatePress(clickedButton);
  checkUserPattern(userClickedPattern.length-1);

});
function checkUserPattern(i)
{
  if(userClickedPattern[i]===gamePattern[i])
  {
    console.log("success");

    if(i===gamePattern.length-1){setTimeout(function () {
          nextSequence();
        }, 1000);}
  }
  else if(userClickedPattern[i]!=gamePattern[i])
  {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over,press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    restartGame();
  }
}
function restartGame()
{

  level=0;
  gamePattern=[];
  started=false;
}

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name)
{
  var audio = new Audio("sounds/" + name+ ".mp3");
  audio.play();
}

function animatePress(name)
{
  $("#"+name).addClass("pressed");

  setTimeout(function(){
      $("#"+name).removeClass("pressed");
  }, 100);

}
