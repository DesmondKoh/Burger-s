$(document).ready(function () { 
  loadMenu() 
  setTimeout(function(){
     $(".loader").fadeOut("slow"); 
    }, 1500);  
})

function loadMenu(){
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
        let char = Array.from(response[j].Id);
        let menu;

        if(char[0] == "M"){
          menu = "menu-mains";
        }
        else if(char[0] == "S"){
          menu = "menu-sides";
        }
        else if(char[0] == "D"){
          menu = "menu-drinks";
        }

        $("." + menu).append(`<div class="item">
                                    <div class="row">
                                        <div class="col-md-2 col-2">
                                        <img src="https://burgers-e911.restdb.io/media/`+ response[j].Image + `?key=` + APIKEY + `">
                                        </div>
                                        <div class="col-md-6 col-7">
                                            <h3 id="item-name">`+ response[j].Name + `</h3>
                                            <h5 id="item-description">`+ response[j].Description +`</h5>
                                        </div>
                                        <div class="col-md-4 col-3 right-align">
                                            <h3 id="item-price">$`+ response[j].Price +`</h3>
                                            <button type="button" class="btn btn-warning"  id="` + response[j].Id+ `">Add to cart</button>
                                        </div>
                                    </div>
                                </div>`)
      }
    });
  
}

function addItemToCart(id){
  $("#addToCart").modal("show");

  setTimeout(function(){
    $("#addToCart").modal("hide"); 
   }, 1000);  

  let jsondata = {
    "ItemId": id
  };

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burgers-e911.restdb.io/rest/cart",
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
  });
}

$(".menu-mains").on("click", "button", function(){  
  addItemToCart(this.id);
});

$(".menu-sides").on("click", "button", function(){  
  addItemToCart(this.id);
});

$(".menu-drinks").on("click", "button", function(){  
  addItemToCart(this.id);
});
