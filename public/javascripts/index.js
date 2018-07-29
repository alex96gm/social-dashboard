$( document ).ready(function() {
    hoverUser(); 
    clickUser();
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


