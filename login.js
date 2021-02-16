let APIKEY = "601acf656adfba69db8b6d25";

$("#login").on("click", function () {
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
        for (let j = 0; j < response.length; j++) {
            if(username == response[j].username && password == response[j].password){
                window.open("index.html?user=" + response[j]._id);
            }
            else
            {
                $("#notFound").modal("show");
                setTimeout(function(){
                  $("#notFound").modal("hide"); 
                 }, 1000);  
            }
        }
      });

})
