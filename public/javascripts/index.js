$(document).ready(function () {
    clickUser();
});

const Selectors = {
    UserBar: '.user-navbar',
};
const $userBar = $(Selectors.UserBar);

function clickUser() {
    $userBar.on("click", function () {
        $('.infoUser').toggle();
    });
}






