let user = getUser();

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

$("#home").on("click", function () {
    window.open("index.html?user=" + user);
})

$("#order").on("click", function () {
    window.open("order.html?user=" + user);
})

$("#reward").on("click", function () {
    window.open("reward.html?user=" + user);
})

$("#cart").on("click", function () {
    window.open("cart.html?user=" + user);
})