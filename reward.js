





 
function rotateFunction(){
  var spinsLeft = 1 ;
  const APIKEY = "601acf656adfba69db8b6d25";
  var couponId;
  var couponName;  
  var username = 'herman01';
  
  
  var possibleNumbersArray = [1800,1900,2050,2475];
  randomNum = Math.round(Math.random() * 4);
  
  var deg = possibleNumbersArray[randomNum];
  document.getElementById('box').style.transform = "rotate("+deg+"deg)";
 

  if  (deg = 1800)
      {
        couponId = 2;
        couponName = '$4Coupon';
      }

  
  else if (deg == 1900)
      {
        couponId = 4;
        couponName = '20%Off';



      }
      


  else if (deg == 2050)
  {
    couponId = 3;
    couponName = '10%Off';



  }


  else if (deg == 2475)
  {
    couponId = 1;
    couponName = '$2Coupon';


  }
  
  



  
  
  let jsondata = {
    "couponId":couponId,
    "username":username
    

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
    console.log(response);
})


  spinsLeft -= 1;


}

 

