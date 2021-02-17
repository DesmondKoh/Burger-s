$(document).ready(function () {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burgers-e911.restdb.io/rest/account",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    for(let i = 0; i < response.length; i++){
      let account = $("#navbarDropdownMenuLink").text()
      if(account == "Account"){
        $(".current-point").html("<p>Please login to view points,</p>")   
      }
      else if(account == response[i].username){   
        $(".current-point").html("<p>You have " + response[i].point + " points</p>")  
      }
    }
  });
})
 
function rotateFunction(){
  var spinsLeft = 1 ;
  var couponId;
  var couponName;  
  let account = $("#navbarDropdownMenuLink").text()
  
  var possibleNumbersArray = [1800,1900,2050,2475];
  randomNum = Math.round(Math.random() * 4);
  
  var deg = possibleNumbersArray[randomNum];
  document.getElementById('box').style.transform = "rotate("+deg+"deg)";
 
  if (deg <= 1800)
  {
    couponId = 2;
    couponName = '$4 OFF';
  } 
  else if (deg <= 1900)
  {
    couponId = 4;
    couponName = '20% OFF';
  }
  else if (deg <= 2050)
  {
    couponId = 3;
    couponName = '10% OFF';
  }
  else if (deg <= 2475)
  {
    couponId = 1;
    couponName = '$2 OFF';
  }
  
  
  let jsondata = {
    "couponId":couponId,
    "username": account
  };

  let settings = {
    "async": true,
    "crossDomain": true, 
    "url": "https://burgers-e911.restdb.io/rest/reward",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)

  }

  $.ajax(settings).done(function (response) {
  })
  spinsLeft -= 1;
}

 

