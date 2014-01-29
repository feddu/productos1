$(document).on('pageinit', '#home', function(){      

    var quer =  "SELECT * FROM html WHERE url ='http://lalujuria.pe/productos.html'";
        quer += " and xpath='//div[@id=\"contenedor_productos\"]//ul//li//div'";

        //quer += " and xpath='//div[@id=\"contenedor_productos\"]//ul//li//div//a//img'";
    //var yql_query = "select * from html where url='" + news_url + story + "'";      
      //  yql_query += " and xpath='//div[@class=\"content\"]//div[@class=\"txt\"]/p'";    
    
        var url = "http://query.yahooapis.com/v1/public/yql?q=" + 
                  encodeURIComponent(quer) + "&format=json&diagnostics=true";
    $.ajax({
        url: url ,
        crossDomain:true,
        dataType: "json",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {

            alert('Network error has occurred please try again!');
        }
    });  

});

$(document).on('pagebeforeshow', '#headline', function(){  
    var movieData = $('#movie-data');
        movieData.empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.a.id == movieInfo.id) {
            movieData.append('<li><img src="http://lalujuria.pe/'+row.a.img.src+'"></li>');
            movieData.append('<li>'+row.p+'</li>');
            movieData.append('<li><a href="" data-ids="'+row.a.id+'" id="pedidos">Hacer un pedido</a></li>');      
            movieData.listview('refresh');           
        }
    });    
});

$(document).on('pagebeforeshow', '#pedido', function(){  
    var movieData = $('#movie-data-pedido');
        movieData.empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.a.id == movieInfo.id) {
            //console.log("Selecciono Pedidoo "+movieInfo.id);
            movieData.append('<li><img src="http://lalujuria.pe/'+row.a.img.src+'"></li>');
            movieData.append('<li>'+row.p+'</li>');    
            movieData.append('<li style="display:none;"><input type="text" id="producto" name="producto" value="'+row.p+'" /></li>');    
            movieData.append('<li>Cantidad: <input type="text" id="cantidad" name="cantidad" class="ui-body-c ui-corner-all ui-shadow-inset" value=""/></li>');
            movieData.append('<li>E-mail:   <input type="text" id="email" name="email" class="ui-body-c ui-corner-all ui-shadow-inset" value=""/></li>');   
            movieData.append('<li><input type="submit" value="Submit"></li>');   
            movieData.listview('refresh');           
        }
    });    
});

$(document).on('vclick', '#movie-list li a', function(){  
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
});

$(document).on('vclick', '#pedidos', function(){  
    movieInfo.id = $(this).attr('data-ids');
    $.mobile.changePage( "#pedido", { transition: "slide", changeHash: false });
});

$(document).on('submit', 'form', function(){
    var postData = $(this).serialize();
    //console.log("Bien1: "+postData);
    var postCant = $('#cantidad').val();
    var postEmail = $('#email').val();
    console.log(postCant+" Bien1: "+postEmail);

    if(postCant === ""){
         alert("Por favor llenar la cantidad deseada");
    }else if(postEmail === ""){
         alert("Por favor proporcionar un email");
    }else{
         console.log("NO VACIO");
         $.ajax({
                type: 'POST',
                data: postData,
                //change the url for your project
                url: 'http://roinet.pe/dispositivos/pedidos/envio/db.php',
                success: function(data){
                    console.log("Bien2: "+data);
                    //alert('Your comment was successfully added');
                },
                error: function(){
                    //console.log("Mal "+JSON.stringify(data));
                    console.log("Mal ");
                    //alert('There was an error adding your comment');
                }
            });
        
    }
    return false;
});

var movieInfo = {
    id : null,
    result : null
}

var ajax = {  
    parseJSONP:function(result){  

        movieInfo.result = result.query.results.div;

      $.each(movieInfo.result, function(i, row) {
            $('#movie-list').append('<li><a href="" data-id="' + row.a.id + '"><img src="http://lalujuria.pe/'+row.a.img.src+'"/><h3>' + row.p + '</h3></a></li>');
      });
      $('#movie-list').listview('refresh');
    }
}