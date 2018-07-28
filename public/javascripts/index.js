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

// spotyApi.setAccessToken(accessToken);
//             return Promise.all(
//                 spotyApi.getTopArtist(),
//                 spotyApi.getTopSongs(),
//             )
//             .then(results => {
//                 const artist = results[0];
//                 const songs = results[1];

//                 return Promise.all(
//                     topArtist.save(),
//                     topSongs.save(),
//                     user.save()
//                 )
//                 .then(results => {
//                     next(null, results[2]);
//                 })
//             })