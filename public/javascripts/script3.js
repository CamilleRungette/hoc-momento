$(document).ready(function() {
  $.fn.slide = function() {
    var slidesToDisplay = 4.7;
    var slider = $(this)
      .children()
      .children();
    var sliderOuter = $(this).children();
    
    var sliderOuterWidth = parseInt(sliderOuter.css('width'));
  
    var slide = $(".slide-content").css('width')
    console.log(slide);
    

    var eachSlideWidth = sliderOuterWidth / slidesToDisplay;

    $(slider)
      .children()
      .css('width', eachSlideWidth);

    $(this)
      .find('.prev')
      .click(function(e) {
        e.preventDefault();
        if (
          parseInt(slider.css('right')) + sliderOuterWidth !=
          slider.children().length * eachSlideWidth
        ) {
          slider.animate({ right: '+=' + eachSlideWidth });
        }
      });

    $(this)
      .find('.next')
      .click(function(e) {
        e.preventDefault();
        if (parseInt(slider.css('right')) != 0) {
          slider.animate({ right: '-=' + eachSlideWidth });
        }
      });
  };

  $('.slider-overflow').slide();
});