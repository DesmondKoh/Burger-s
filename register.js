let point = 0;
$("#registered").hide();
$("#invalid").hide();
$("#invalid-fill").hide();

//Register button
$("#register-btn").on("click", function () { 
  let username = $("#username").val();
  let password = $("#password").val();
  let c_password = $("#c-password").val();

  //Validation check
  if(username == "" || password == "" || c_password == ""){
    $("#invalid-fill").show();
  }
  else if(password != c_password){
    $("#invalid").show();
  }
  else
  {
    $("#registered").show();
    let jsondata = {
      "username":username,
      "password": password,
      "point":point
    };
    
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://burgers-e911.restdb.io/rest/account",
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
  }
})