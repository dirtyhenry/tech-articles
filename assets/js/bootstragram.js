$(function() {
    console.log("toto");
    function removeNavbarLinksWhenScreenIsNotWideEnough() {
        console.log("Width: " + $(window).width());
    }

    // If the footer is in the middle of the screen, bring it down!
    if ($(document).height() < screen.availHeight) {
        $("footer").css("position", "fixed");
        $("footer").css("bottom", "0");
    }
});