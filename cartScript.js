let APIKEY = "601acf656adfba69db8b6d25";
let total = 0;

$(document).ready(function () {
    getCart();  
    setTimeout(function(){
        $(".loader").fadeOut("slow"); 
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
      
      let item_amount = 0;
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
                    console.log(response)
                }        
            }
        }); 
}

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
                                        <h5>$`+(total+deliveryfee)+`</h5>
                                    </div>
                                </div>`)
}

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

$(".items").on("click", ".remove", function(){  
    $("#deleteFromCart").modal("show");
    setTimeout(function(){
      $("#deleteFromCart").modal("hide"); 
     }, 1000);  

    deleteItem(this.id); 
});

