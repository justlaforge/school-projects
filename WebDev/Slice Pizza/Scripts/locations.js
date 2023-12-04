
$(document).ready(function () {
var today = new Date();
var time = today.getHours();

  if(time >= 2 && time < 17){
     $("#moon h2").append("Now Open");
  } else {
     $("#moon h2").append("Now Closed");
  }

  if(time >= 11 && time < 23){
     $("#atlantis h2").append("Now Open");
  } else {
     $("#atlantis h2").append("Now Closed");
  }

  if(time >= 14 && time < 11){
     $("#bermuda h2").append("Now Open");
  } else {
     $("#bermuda h2").append("Now Closed");
  }

  if(time >= 12 && time < 21){
     $("#mount h2").append("Now Open");
  } else {
     $("#mount h2").append("Now Closed");
  }
});