$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#related").has("img").length ? true : false;
      if(full == false){
         $('#related').empty();
      }
   });

   var getrelated = function(){

        var artist = $('#term').val();

         if(artist == ''){

            $('#related').html("<h2 class='loading'>Please enter an artist...</h2>");

         } else {

            $('#related').html("<h2 class='loading'>Loading...</h2>");

            $.getJSON("http://developer.echonest.com/api/v4/artist/similar?api_key=ACE8O1JKNVBTPUMHX&results=4&name=" + artist, function(json) {
               console.log(json);
				$('#related').empty();
				$('#related').append("<h2 class='artist'>" + json.response.artists[0].name + "</h2>");
				$('#related').append("<h2 class='artist'>" + json.response.artists[1].name + "</h2>");
				$('#related').append("<h2 class='artist'>" + json.response.artists[2].name + "</h2>");
				$('#related').append("<h2 class='artist'>" + json.response.artists[3].name + "</h2>");
             });
          }

        return false;
   }

   $('#search').click(getrelated);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getrelated();
       }
   });

});