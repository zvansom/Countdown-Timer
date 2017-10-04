$(document).ready(function() {

  var breakTime = $('#breakTimer').text();
  var sessionTime =  $('#sessionTimer').text();
  var seconds;
  var totalTime;
  var onBreak = false;
  var timer;

  if(!timer){
    $('#status').text("No timer running");
  }

  function updateTime() {
    // console.log("Update");
    if(!seconds){
      seconds = sessionTime * 60;
      totalTime = seconds;
    }
    if(onBreak == false){
      $('#status').text("WORK TIME");
    } else {
      $('#status').text("BREAK TIME");
    }
    var minutes = Math.floor(seconds / 60);
    var dispSecs = Math.floor(seconds % 60);
    displayTime(minutes, dispSecs);
  }

  function displayTime(minutes, dispSecs){
    // console.log('Display');

    if(minutes < 10){
      minutes = ("0" + minutes).slice(-2);
    }
    if(dispSecs < 10){
      dispSecs = ("0" + dispSecs).slice(-2);
    }

    // Progress bar
    var progress = (seconds / totalTime * 100) - 1;
    $('#percentComplete').css("height", progress + '%');

    $('#timer').text(minutes + ":" + dispSecs);
  }

  function runTimer() {
    // console.log("Run");

    if(seconds > 1) {
      seconds--;
      updateTime(seconds);
    } else {
      clearInterval(timer);
      displayTime(0, 0);
      if(onBreak == true){
        onBreak = false;
        resetTimer();
        alert("This session is complete!  Press Start to begin a new session.");
      } else {
        console.log("Break Time!");
        onBreak = true;
        breakTimer();
      }
    }
  }

  function resetTimer() {
    clearInterval(timer);
    $('#start').text('Start');
    timer = undefined;
    seconds = undefined;
    displayTime(0, 0);
    $('#status').text("No timer running.");
  }

  function breakTimer() {
    seconds = (breakTime * 60) + 1;
    totalTime = seconds;
    timer = setInterval(runTimer, 1000);
  }

  // Decrement minutes.  No less than 1.
  $('#sessionMinus').click(function() {
    if(sessionTime > 1){
      sessionTime--;
      $('#sessionTimer').text(sessionTime);
    }
  });

  // Increment minutes.  No more than 60.
  $('#sessionPlus').click(function() {
    if(sessionTime < 60){
      sessionTime++;
      $('#sessionTimer').text(sessionTime);
    }
  });

  // Decrement break time.  No less than 1.
  $('#breakMinus').click(function() {
    if(breakTime > 1){
      breakTime--;
      $('#breakTimer').text(breakTime);
    }
  });

  // Increment break time.  No more than 60.
  $('#breakPlus').click(function() {
    if(breakTime < 60){
      breakTime++;
      $('#breakTimer').text(breakTime);
    }
  });

  $('#start').click(function() {
    // console.log("Click");

    if($('#start').text() == 'Start'){
      updateTime();
      $('#start').text('Pause');
      timer = setInterval(runTimer, 1000);
    } else if($('#start').text() == 'Pause'){
      $('#start').text('Start');
      $('#status').text('PAUSED');
      clearInterval(timer);
    }
  });

  $('#reset').click(function() {
    resetTimer();
  });

});
