$(document).ready(function () {
    hoverUser();
    clickUser();
});

const Selectors = {
    UserBar: '.user-navbar',
};
const $userBar = $(Selectors.UserBar);

function hoverUser() {

    $userBar.hover(
        function () {
            $('.infoUser').show();
        },
        function () {
            $('.infoUser').hide();
        }
    );
}
function clickUser() {
    $userBar.on("click", function () {
        $('.infoUser').hide();
    });
}



