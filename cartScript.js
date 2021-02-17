let APIKEY = "601acf656adfba69db8b6d25";
let total = 0;

$(".complete-loader").hide();
$("#invalid").hide();
$("#invalid-address").hide();

$(document).ready(function () {
    getCart();  
    setTimeout(function(){
        $(".cart-loader").fadeOut("slow"); 
       }, 4000);  
})

function getCart(){
    $(".items").html("") 
    $(".summary-info").html("")
    total = 0;
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
            loadItem(response[i].ItemId, response[i]._id)
        }
      });
}

//Load item from RestDB
let item_amount = 0;
function loadItem(id, objectid){
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
                $(".items").append(`<div class="row">
                                            <div class="col-md-2">
                                                <img src="https://burgers-e911.restdb.io/media/`+ response[j].Image + `?key=` + APIKEY + `">
                                            </div>
                                            <div class="col-md-8">
                                                <h4>`+response[j].Name+`</h4>
                                                <h5>$`+response[j].Price+`</h5>
                                            </div>
                                            <div class="col-md-2 right-align">
                                                <h4>Qty: 1</h4>
                                                <a href="#" class="remove" id="`+objectid+`">Remove</a>
                                            </div>
                                        </div>
                                        <hr>`)        
                item_amount++;
                $("#items").html("<h2>ITEMS: " + item_amount)
                total += response[j].Price
                loadSummary(total)
            }        
        }
    }); 
}

//Load summary
function loadSummary(total){
    let deliveryfee = 4;
    $(".summary-info").html(` <div class="row">
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
                                        <h5 class="total" id="`+(total+deliveryfee)+`">$`+(total+deliveryfee)+`</h5>
                                    </div>
                                </div>`)
}

//Display delete item modal when user remove item
$(".items").on("click", ".remove", function(){  
    $("#deleteFromCart").modal("show");
    setTimeout(function(){
      $("#deleteFromCart").modal("hide"); 
     }, 1000);  

    deleteItem(this.id); 
});

//Remove a single item from cart
function deleteItem(id){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/cart/" + id,
        "method": "DELETE",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        getCart();
      });
}

//Checkout
$("#checkout").on("click", function(){
    let account = $("#navbarDropdownMenuLink").text()
    let address = $("#address").val()
    if(address == ""){
        $("#invalid-address").show();
    }  
    else if(account == "Account"){
        $("#invalid").show();
    }
    else
    {
        $(".complete-loader").show(); 
        clearCart()
        removeCoupon($("#voucher-id").text())
        
        //Retrive account information
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
            total = $(".d-total").attr("id") 
            if(total == undefined){
                total = $(".total").attr("id") 
            }

            for(let j = 0; j < response.length; j++){ 
                if(account == response[j].username){  
                    addPoints(response[j]._id, response[j].username, response[j].password, response[j].point + parseInt(total))
                    $("#earned-point").html('You have earned ' + parseInt(total) + ' points from this order.')
                }
            }
        });   
    }
})

//Add point
function addPoints(id, username, password, point){
    //Update account information
    var jsondata = {"username" : username, 
    "password" : password, 
    "point" : point};

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burgers-e911.restdb.io/rest/account/" + id,
    "method": "PUT",
    "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
    });
}


//Voucher
$("#voucher").on("click", function(){
    let account = $("#navbarDropdownMenuLink").text()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/reward",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
        
    $.ajax(settings).done(function (response) {
        for(let i = 0; i < response.length; i++){
            if (account == response[i].username){
                loadReward(response[i].couponId,response[i]._id)      
            }
        }
    });
})

//Load data from Reward in RestDB
function loadReward(couponid, id){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/coupon",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
   
    $.ajax(settings).done(function (response) {
        for(let j = 0; j < response.length; j++){
            console.log(response[j].couponId)
            if(couponid == response[j].couponId){    
                $("#display-voucher").append(`<div class="row">
                                                <div class="col-md-9">
                                                <h1>`+response[j].couponName+`</h1>
                                                <h3 class="coupon-id">`+response[j]._id+`</h3>
                                                </div>
                                                <div class="col-md-3">
                                                <a href="#" class="use" id="`+id+`">Use</a>
                                                </div>
                                            </div>
                                            <hr>`)
            }
        }
    });
}

//Display voucher/s of user
$("#display-voucher").on("click", ".use", function(){ 
    $("#voucher-id").html(this.id) 
    $('#voucher-modal').modal('hide')
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/coupon",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    }
   
    $.ajax(settings).done(function (response) {
        for (let j = 0; j < response.length; j++) {
            if($(".coupon-id").text() == response[j]._id){
                if(response[j].price == 0){
                    discount = response[j].percent + "%";
                    d_total = (1 - response[j].percent) * $(".total").attr("id")
                }
                else if(response[j].percent == 0){
                    discount = "$" + response[j].price;
                    d_total = $(".total").attr("id") - response[j].price 
                }
                $(".summary-info").append(`<div class="row">
                                                <div class="col-md-6">
                                                    <h5>Discount</h5>
                                                </div>
                                                <div class="col-md-6 right-align">
                                                    <h5 class="discount">`+discount+`</h5>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h5>D. Total</h5>
                                                </div>
                                                <div class="col-md-6 right-align">
                                                    <h5 class="d-total" id="`+d_total+`">$`+d_total+`</h5>
                                                </div>
                                            </div>`)
            }
        }
    }) 
});

//Remove coupon from user
function removeCoupon(id){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://burgers-e911.restdb.io/rest/reward/" + id,
        "method": "DELETE",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }

      $.ajax(settings).done(function (response) {
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