$("#invalid").hide();
$(".loader").hide(); 

//Login button
$("#login-btn").on("click", function () {
  $(".loader").show();
    setTimeout(function(){
      $(".loader").fadeOut("slow"); 
    }, 2000);  
    let username = $("#username").val();
    let password = $("#password").val();

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
        //Check if user and password match in RestDb
        for (let j = 0; j < response.length; j++) {
            if(username == response[j].username && password == response[j].password){
                window.location.replace("index.html?user=" + response[j]._id);
            }
            else
            {
              $("#invalid").show();
            }
        }
      });
})
