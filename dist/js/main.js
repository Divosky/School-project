!function(t){"use strict";t("a.page-scroll").bind("click",function(o){var a=t(this);t("html, body").stop().animate({scrollTop:t(a.attr("href")).offset().top-50},1250,"easeInOutExpo"),o.preventDefault()}),t("body").scrollspy({target:".navbar-fixed-top",offset:100}),t(".navbar-collapse li a").click(function(){t(".navbar-toggle:visible").click()}),t("#mainNav").affix({offset:{top:50}}),t(document).ready(function(){t(window).scroll(function(){t(window).height()<t(document).scrollTop()?t("#back-to-top").fadeIn():t("#back-to-top").fadeOut()}),t("#back-to-top").click(function(){return t("#back-to-top").tooltip("hide"),t("body, html").animate({scrollTop:0},750),!1}),t("#back-to-top").tooltip("show")}),window.sr=ScrollReveal({reset:!0}),sr.reveal(".header-content",{origin:"left",distance:"5vw",scale:1,duration:1500}),sr.reveal(".page-title",{origin:"top",distance:"10px",scale:.5,duration:1e3}),sr.reveal(".news__container .panel",{origin:"bottom",distance:"10vh",duration:1e3},150),sr.reveal(".sign-on--text",{origin:"bottom",distance:"50vh",duration:2500}),sr.reveal(".contact__box",{origin:"left",distance:"10vh",scale:.2,duration:2e3},500),t("#ajaxModal").on("show.bs.modal",function(o){var a=t(o.relatedTarget);t(this).find("#ajaxContent").load(a.attr("href")),t(this).find("#ajaxTitle").html(a.attr("data-modal-title"))})}(jQuery);