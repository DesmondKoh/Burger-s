let APIKEY = "601acf656adfba69db8b6d25";
let user = getUser();

$(document).ready(function () { 
    //Navigation bar links
    $(".navbar-brand").attr("href", "index.html?user=" + user)
    $("#home").attr("href", "index.html?user=" + user)
    $("#order").attr("href", "order.html?user=" + user)
    $("#reward").attr("href", "reward.html?user=" + user)
    $("#cart").attr("href", "cart.html?user=" + user)
    $("#login").attr("href", "login.html?user=" + user)
    $("#register").attr("href", "register.html?user=" + user)
    $("#btn-menu").attr("onclick", `location.href='order.html?user=` + user +`'` )
    $("#btn-order").attr("onclick", `location.href='order.html?user=` + user +`'` )
    
    if(user != undefined && user != "undefined"){
        getUsername(getUser())
        $(".dropdown-menu").html('<a class="dropdown-item" id="logout" href="index.html?user=undefined">Logout</a>')
    }
})

//Check for user logon using website link parameter
function getUser(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) 
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam)
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);          
    };
    var user = getUrlParameter("user");
    return user; 
}

//Retrive username base on Id in parameter
function getUsername(id){
    let username = ""
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
            if(id == response[i]._id){
                $("#navbarDropdownMenuLink").html(response[i].username)
            }
        } 
    });
}

//Remove all items from cart
function clearCart(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/cart",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }     
      $.ajax(settings).done(function (response) {
        for (let j = 0; j < response.length; j++) {
            var settings_delete = {
                "async": true,
                "crossDomain": true,
                "url": "https://burgers-e911.restdb.io/rest/cart/" + response[j]._id,
                "method": "DELETE",
                "headers": {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache"
                }
            }      
            $.ajax(settings_delete).done(function (response) {
            });
        }
    });  
}

