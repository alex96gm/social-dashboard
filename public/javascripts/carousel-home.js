function moveToSelected(element) {

    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }
  
    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
  
    $(selected).removeClass().addClass("selected");
  
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
  
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
  
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
  
  }
  
  // Eventos teclado
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          moveToSelected('prev');
          break;
  
          case 39: // right
          moveToSelected('next');
          break;
  
          default: return;
      }
      e.preventDefault();
  });
  
  $('#carousel div').click(function() {
    moveToSelected($(this));
  });
  
  $('#prev').click(function() {
    moveToSelected('prev');
  });
  
  $('#next').click(function() {
    moveToSelected('next');
  });

  $(document).ready(function () {
    listenersClickHome();
    
});
  
function listenersClickHome(){
  $( ".menu-right-home-top" ).on( "click", function() {
    $( ".menu-right-home-top" ).css('box-shadow', 'inset 0px 0px 100px -1px rgba(0,0,0,0.75)');
    $( ".menu-right-home-bottom" ).css('box-shadow', 'none');
    $( ".container-music-releases" ).hide( "slow", function() {});
    $( ".container-music-recomendations" ).show( "slow", function() {});
    
  });
  $( ".menu-right-home-bottom" ).on( "click", function() {
    $( ".menu-right-home-bottom" ).css('box-shadow', 'inset 0px 0px 100px -1px rgba(0,0,0,0.75)');
    $( ".menu-right-home-top" ).css('box-shadow', 'none');
    $( ".container-music-recomendations" ).hide( "slow", function() {});
    $( ".container-music-releases" ).show( "slow", function() {});
    $( ".container-music-releases" ).css('display:flex;');
  });
}