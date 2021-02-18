$(document).ready(function () { 
    //Clear cart on first time page launch
    var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        
    for (i = 0; i < sURLVariables.length; i++) {
        if(sURLVariables[i] == ""){
            clearCart();
        }

    }
})

