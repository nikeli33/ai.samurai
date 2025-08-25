//GALLERY
(function ($, window) {
    $(document).ready(function () {
        var reflow = function () {
            $('.pager').css({height: 'auto', width: 'auto'});
            var pagerWidth = $('.pager').width();
            var pagerHeight = $('.pager section:first-child').outerHeight() + 30;
            $('.pager').css({height: pagerHeight, width: pagerWidth});
            $('.pager section').each(function () {
                var $$ = $(this);
                $$.css({
                    top: 0,
                    left: ($$.index() * pagerWidth) + 'px',
                    position: 'absolute',
                    width: pagerWidth
                });
            });

            $('.flip-container').each(function () {
                var $$ = $(this);
                var $d = $('img.detector', $$.parent());
                $d.show();
                var w = $d.width();
                $d.hide();
                $$.css({width: w + 'px', height: w + 'px'});
                $('.front,.back,.flipper', $$).css({width: w + 'px', height: w + 'px', fontSize: (w / 20.1) + 'px'});
            });
        };
        reflow();
        window.initialWidth = $(window).width();
        $(window).resize(function () {
            oldHash = 'reflow';
            if ($(window).width() === window.initialWidth) {
                return false;
            }
            window.initialWidth = $(window).width();
            reflow();
        });
        $(".flipper").flip({
            trigger: 'hover',
            autoSize: false
        });
    });
})(jQuery, window);
//END OF GALLERY


//CAROUSEL
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000);
}
//END OF CAROUSEL

//MODAL WINDOW
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
//END OF MODAL

//AJAX FUNCTION
 
              
//END OF AJAX FUNCTION