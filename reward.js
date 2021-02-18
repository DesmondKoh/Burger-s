let password;
let responseID = 0;
let point = 0;

$(document).ready(function () {
  $("#wheel-arrow").hide()

  //Load points
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
        $(".current-point").html("<p>Please login to view points</p>")   
      }
      else if(account == response[i].username){   
        $(".current-point").html("<p>You have: " + response[i].point + " points</p>")    
        password = response[i].password; 
        point = response[i].point;
        spinLeft = response[i].spinLeft;
        responseID = response[i]._id;  
      }
    } 
  });

  setTimeout(function(){
    $(".loader").fadeOut("slow"); 
    $("#wheel-arrow").fadeIn("slow")
   }, 4000); 

  loadRewards()
})
 
let couponId;
let couponName;  
//Spin wheel on "spin button click"
function rotateFunction(){
  if(point >= 50){
    var possibleNumbersArray = [1800,1900,2050,2475];
    randomNum = Math.round(Math.random() * 4);
    
    var deg = possibleNumbersArray[randomNum];
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";
  
    if (deg <= 1800)
    {
      couponId = 0;
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
    updateReward(couponId)
    deductPoint()
  }
  else{
    $(".win-text").html(`<h2>You do not have enough points.</h2>`)
  }
  
}

//Add reward to reward table in RestDb
function updateReward(couponId){
  let account = $("#navbarDropdownMenuLink").text()
  let id = couponId;
  let jsondata = {"couponId": id,"username": account};
  var settings = {
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
    $(".win-text").html(`<h1>CONGRATULATIONS!</h1>
    <h3>You won `+ couponName +` COUPON</h3>`)
  });
}

//Deduct point
function deductPoint(){
  let account = $("#navbarDropdownMenuLink").text()
  var deductedpoint = point - 50
  var jsondata = {"username": account,"password": password, "point": deductedpoint};
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burgers-e911.restdb.io/rest/account/" + responseID,
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }

  $.ajax(settings).done(function (response) {
  });
}

//Load all rewards available
function loadRewards(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burgers-e911.restdb.io/rest/coupon",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    for(let i = 0; i < response.length; i++){
      if(response[i].price == 0){
        discount = "$" + response[i].percent
      }
      else if(response[i].percent == 0){
        discount = response[i].price + "%"
      }
      $("#reward-info").append( `<tr>
                                  <th scope="row">`+response[i].couponId+`</th>
                                  <td>`+response[i].couponName+`</td>
                                  <td>`+discount+`</td>
                                </tr>`)
    }   
  });
}