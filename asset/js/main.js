// iOS devices
window.addEventListener("DOMContentLoaded", function() {
    $("body").queryLoader2({
        barColor: "#6e6d73",
        backgroundColor: "#FFF1B0",
        percentage: true,
        barHeight: 30,
        completeAnimation: "grow",
        onComplete: function() {
            $(".loading").fadeOut();
            $(".cover").addClass("cover-opacity");
            var w = $(window).width();
            var h = $(window).height();
            $(".select-screen").css({
                left: ((w - $(".select-screen").width()) / 2),
                top: ((h - $(".select-screen").height()) / 2)
            });
            $(".select-screen").fadeIn();
        }
    });
});

// document
$(document).ready(function() {
    // Query Loader
    $("body").queryLoader2({
        barColor: "#6e6d73",
        backgroundColor: "#FFF1B0",
        percentage: true,
        barHeight: 30,
        completeAnimation: "grow",
        onComplete: function() {
            $(".loading").fadeOut();
            $(".cover").addClass("cover-opacity");
            var w = $(window).width();
            var h = $(window).height();
            $(".select-screen").css({
                left: ((w - $(".select-screen").width()) / 2),
                top: ((h - $(".select-screen").height()) / 2)
            });
            $(".select-screen").fadeIn();
        }
    });
    $(window).resize(function(e) {
        var w = $(window).width();
        var h = $(window).height();
        $(".select-screen").css({
            left: ((w - $(".select-screen").width()) / 2),
            top: ((h - $(".select-screen").height()) / 2)
        });
        $(".select-screen").fadeIn();
    });
    $(".screen-normal").click(function(e) {
        $(".fullscreen").fadeIn();
        $(".page-cover").fadeOut();
        showpage("home");
        e.preventDefault();
    });
    $(".screen-full").click(function(e) {
        $(".fullscreen").fadeIn();
        $(".page-cover").fadeOut();
        showpage("home");
        $(document).toggleFullScreen();
        e.preventDefault();
    });
    // Loading Clock
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    setInterval(function() {
        var minutes = new Date().getMinutes();
        var hours = new Date().getHours();
        $(".timeMin").html((minutes < 10 ? "0" : "") + minutes);
        $(".timeHours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);
    // Tooltip
    $("[data-hover='tooltip']").tipsy();
    // Side Icons
    $(".fullscreen").click(function(e) {
        $(document).toggleFullScreen();
        galleryreload();
    });
    $(".gohome").click(function(e) {
        showpage("home")
    });
    // Show Page
    var hideAll = false;

    function showpage(page) {
        var nav = $(".nav");
        if (page !== nav.data("page")) {
            if (!hideAll) {
                $(".page-item:not(page-home)").hide();
                hideAll = true;
            }
            $(".nav a").each(function() {
                if (page == $(this).attr("href").replace("#", "")) {
                    $(".nav a").parent().removeClass("here");
                    $(this).parent().addClass("here");
                }
            });
            $(".page-" + nav.data("page")).fadeOut("slow");
            if (page == "home") {
                $(".nav").addClass("hide");
                $(".gohome").fadeOut();
            } else {
                $(".nav").removeClass("hide");
                $(".gohome").fadeIn();
                galleryreload(page);
            }
            $(".page-" + page).fadeIn("slow");
            nav.data("page", page);
            $("body").queue([]).stop().scrollTo(0, 1500, {
                easing: "easeOutBack"
            });
        }
    }
    // Bubble Menu Hover
    $(document).mousemove(function(e) {
        var x = e.clientX + $(this).scrollLeft();
        var y = e.clientY + $(this).scrollTop();
        //$(".hand").offset({left: x + 3, top: y});
        $(".bubble-menu.hover").removeClass("hover");
        $(".bubble-menu").each(function() {
            var bubble = $(this);
            var top = bubble.offset().top;
            var left = bubble.offset().left;
            var w = bubble.width();
            var h = bubble.height();
            if ((x >= left && y >= top) && (x <= (left + w) && y <= (top + h)) && !bubble.hasClass("bubble-here")) {
                $('[class^="bubble-"]').each(function() {
                    $(this).removeClass("hover");
                });
                bubble.addClass("hover");
            }
        });
    });
    // Bubble Menu
    $(".home").click(function(e) {
        var x = e.clientX + $(document).scrollLeft();
        var y = e.clientY + $(document).scrollTop();
        $(".bubble-menu").each(function() {
            var bubble = $(this);
            var page = bubble.data("page");
            var top = bubble.offset().top;
            var left = bubble.offset().left;
            var w = bubble.width();
            var h = bubble.height();
            if ((x >= left && y >= top) && (x <= (left + w) && y <= (top + h)) && !bubble.hasClass("bubble-here")) {
                showpage(page);
            }
        });
    });
    // Nav
    $(".nav a").click(function(e) {
        var page = $(this).attr("href").replace("#", "");
        showpage(page);
        e.preventDefault();
    });
    // Player
    var a = audiojs.createAll({
        playPause: function() {},
        play: function() {
            $(".stereo").addClass("speakerpulsate");
            $(".avatar").addClass("dance");
        },
        pause: function() {
            $(".stereo").removeClass("speakerpulsate");
            $(".avatar").removeClass("dance");
        }
    });
    var audio = a[0];
    first = $(".music-list a").attr("data-src");
    audio.load(first);
    audio.setVolume(1);
    $(".stereo").click(function(e) {
        audio.playPause()
    });
    // Swiper
    var gallerychar = $(".swiper-container-char").swiper({
        centeredSlides: true,
        grabCursor: true,
    });
    $(".swiper-container-char .fa-angle-left").click(function(e) {
        gallerychar.swipePrev();
        e.preventDefault();
    });
    $(".swiper-container-char .fa-angle-right").click(function(e) {
        gallerychar.swipeNext();
        e.preventDefault();
    });
    var galleryui = $(".swiper-container-ui").swiper({
        centeredSlides: true,
        grabCursor: true
    });
    $(".swiper-container-ui .fa-angle-left").click(function(e) {
        galleryui.swipePrev();
        e.preventDefault();
    });
    $(".swiper-container-ui .fa-angle-right").click(function(e) {
        galleryui.swipeNext();
        e.preventDefault();
    });
    var gallerylogo = $(".swiper-container-logo").swiper({
        centeredSlides: true,
        grabCursor: true
    });
    $(".swiper-container-logo .fa-angle-left").click(function(e) {
        gallerylogo.swipePrev();
        e.preventDefault();
    });
    $(".swiper-container-logo .fa-angle-right").click(function(e) {
        gallerylogo.swipeNext();
        e.preventDefault();
    });

    function galleryreload(page) {
        if (page == "char" || page == "") {
            gallerychar = $(".swiper-container-char").swiper({
                centeredSlides: true,
                grabCursor: true,
            });
        }
        if (page == "ui" || page == "") {
            galleryui = $(".swiper-container-ui").swiper({
                centeredSlides: true,
                grabCursor: true
            });
        }
        if (page == "logo" || page == "") {
            gallerylogo = $(".swiper-container-logo").swiper({
                centeredSlides: true,
                grabCursor: true
            });
        }
    }
    $(window).resize(function() {
        gallerychar.resizeFix(true);
        galleryui.resizeFix(true);
        gallerylogo.resizeFix(true);
    });
    // About me
    $(".aboutme").draggable({
        revert: "invalid",
        cursor: "move",
        opacity: 0.7
    });
    // Move Screen
    //$("body").moveScreen({speed: 2000, ratio: 2, easing: 'easeOutBack'});
});

// Parallax
var $html = $("html"),
    $container = $("#container"),
    $scene = $("#scene");
if (Hammer.HAS_TOUCHEVENTS) {
    $container.hammer({
        drag_lock_to_axis: true
    })
}
$html.addClass(Hammer.HAS_TOUCHEVENTS ? "touch" : "mouse");
$scene.parallax();
