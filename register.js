let point = 0;
$("#registered").hide();

$("#register-btn").on("click", function () {
  $("#registered").show();
  let username = $("#username").val();
  let password = $("#password").val();

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
})