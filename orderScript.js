let APIKEY = "601acf656adfba69db8b6d25";

$(document).ready(function () { 
  loadMenu(APIKEY) 
  setTimeout(function(){
     $(".loader").fadeOut("slow"); 
    }, 5500);  
})

function loadMenu(APIKEY){
  let menu = ["menu-mains", "menu-drinks", "menu-sides"];
  for (let i = 0; i < 3; i++){ 
    var setting = {
      "async": true,
      "crossDomain": true,
      "url": "https://burgers-e911.restdb.io/rest/" + menu[i],
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      }
    }

    $.ajax(setting).done(function (response) {       
      for (let j = 0; j < response.length; j++) {
        $("." + menu[i]).append(`<div class="item">
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
 
}

$(".menu-mains").on("click", "button", function(){  
  console.log(this.id); 
});

$(".menu-sides").on("click", "button", function(){  
  console.log(this.id); 
});

$(".menu-drinks").on("click", "button", function(){  
  console.log(this.id); 
});