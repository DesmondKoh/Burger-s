let user = getUser();

$(document).ready(function () { 
    $(".navbar-brand").attr("href","index.html?user=" + user)
    $("#home").attr("href", "index.html?user=" + user)
    $("#order").attr("href", "order.html?user=" + user)
    $("#reward").attr("href", "reward.html?user=" + user)
    $("#cart").attr("href", "cart.html?user=" + user)
    $("#login").attr("href", "login.html?user=" + user)
    $("#register").attr("href", "register.html?user=" + user)
    
    if(user != undefined && user != "undefined"){
        $("#navbarDropdownMenuLink").html(user)
        $(".dropdown-menu").html('<a class="dropdown-item" id="logout" href="index.html?user=undefined">Logout</a>')
    }
})

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
