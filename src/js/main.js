/*//Collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-to").removeClass("top-nav-collapse");
    }
}); */

(function($) {
    "use strict"; // Start of use strict

    // Page scrolling feature
    $("a.page-scroll").bind("click", function(event) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: ($($anchor.attr("href")).offset().top - 50)
        }, 1250, "easeInOutExpo");
        event.preventDefault();
    })

    // Highlight the top nav as scrolling occurs
    $("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 100
    })

    // Closes the Responsive Menu on Menu Item Click
    $(".navbar-collapse li a").click(function() {
        $(".navbar-toggle:visible").click();
    })

    // Offset for Main Navigation
    $("#mainNav").affix({
        offset: {
            top: 50
        }
    })

    // Scroll back to top of the page
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(window).height() < $(document).scrollTop()) {
                $("#back-to-top").fadeIn();
            } else {
                $("#back-to-top").fadeOut();
            }
        });
        $("#back-to-top").click(function() {
            $("#back-to-top").tooltip("hide");
            $("body, html").animate({
                scrollTop: 0
            }, 750);
            return false;
        });
        $("#back-to-top").tooltip("show");
    });

    // Animations when scrolling
    window.sr = ScrollReveal({
        reset: true
    });

    sr.reveal('.header-content', {
        origin: 'left',
        distance: '5vw',
        scale: 1,
        duration: 1500
    })
    sr.reveal('.page-title', {
        origin: 'top',
        distance: '10px',
        scale: 0.5,
        duration: 1000
    })
    sr.reveal('.news__container .panel', {
        origin: 'bottom',
        distance: '10vh',
        duration: 1000
    }, 150);
    sr.reveal('.sign-on--text', {
        origin: 'bottom',
        distance: '50vh',
        duration: 2500
    })

    sr.reveal('.contact__box', {
        origin: 'left',
        distance: '10vh',
        scale: 0.2,
        duration: 2000
    }, 500);

    // Load external content
    $("#ajaxModal").on("show.bs.modal", function(e) {
        var link = $(e.relatedTarget);
        $(this).find("#ajaxContent").load(link.attr("href"));
        $(this).find("#ajaxTitle").html(link.attr("data-modal-title"));
    })

})(jQuery); // End of the strict mode
