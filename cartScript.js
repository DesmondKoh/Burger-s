let APIKEY = "601acf656adfba69db8b6d25";
let total = 0;

$(document).ready(function () {
    getCart();  
    setTimeout(function(){
        $(".loader").fadeOut("slow"); 
       }, 7000);  
})

function getCart(){
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
        for (let i = 0; i < response.length; i++){
            loadMenuInfo(response[i].ItemId)
        }
      });
}

function loadMenuInfo(id){
      var setting = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/menu",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
  
        $.ajax(setting).done(function (response) {    
            for (let j = 0; j < response.length; j++) {   
                if(id == response[j].Id){ 
                    $(".cart-info").append(`<div class="row">
                                            <div class="col-md-2">
                                            <img src="https://burgers-e911.restdb.io/media/`+ response[j].Image + `?key=` + APIKEY + `">
                                            </div>
                                            <div class="col-md-8">
                                                <h4>`+response[j].Name+`</h4>
                                                <h5>Qty: 1</h5>
                                            </div>
                                            <div class="col-md-2 right-align">
                                                <h4>$`+response[j].Price+`</h4>
                                                <a href="#" class="item-remove" id="`+response[j].Id+`">Remove</a>
                                            </div>
                                        </div>
                                        <hr>`)

                    total += response[j].Price
                    loadSummary(total)
                }        
            }
        });
    
}

function loadSummary(total){
    let deliveryfee = 4;
    $(".total").html(`<div class="row">
                        <div class="col-md-6">
                            <h5>Subtotal:</h5>
                        </div>
                        <div class="col-md-6 right-align">
                            <h5>$`+total+`</h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <h5>Delivery Fee:</h5>
                        </div>
                        <div class="col-md-6 right-align">
                            <h5>$`+deliveryfee+`</h5>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Total:</h5>
                        </div>
                        <div class="col-md-6 right-align">
                            <h5>$`+(total+deliveryfee)+`</h5>
                        </div>
                    </div>`)
}