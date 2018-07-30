$( document ).ready(function() {
    hoverUser(); 
    clickUser();
    backgroundHome();
});

function hoverUser(){
    $( ".user-navbar" ).hover(
        function() {
          $( '.infoUser' ).show();
        }, 
        function() {
          $( '.infoUser' ).hide();
        }
      );
}
function clickUser(){
    $( ".user-navbar" ).on( "click", function() {
        $( '.infoUser' ).hide();
    });
}

function backgroundHome(){
    setTimeout(function() { 

        var time = 10; /* how long the timer will run (seconds) */
        var interval = setInterval(function() {
            if (i == time) {  	
              clearInterval(interval);
              return;
            }
        $('.home-container').css('background-image', 'url(' + imageUrl + ')');
        }, 1000);
      
      }, 0)
}

