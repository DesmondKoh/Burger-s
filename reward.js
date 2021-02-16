
function rotateFunction(){
  var min = 1080;
  var max = 5400;
  var deg = Math.floor(Math.random() * (max - min)) + min;
  document.getElementById('box').style.transform = "rotate("+deg+"deg)";

    
  }
  

 

