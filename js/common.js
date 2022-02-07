jQuery(function ($) {
  $(window)
    .resize(function () {
      if ($('.circle').length > 0) {
        $('.circle').height($('.circle').width());

        var $icons = $('.circle__icon');
        var radius = $('.circle').width() / 2;

        $icons.each(function (i) {
          var radians = 2 * Math.PI * (i / $icons.length);
          vardegrees = (radians * radius) / Math.PI;

          $(this).css({
            top: radius + Math.cos(radians) * radius - $(this).width() / 2,
            left: radius + (-1 * (Math.sin(radians) * radius) - $(this).width() / 2),
          });
        });
      }
    })
    .resize();

  $(window);

  if ($('.circle').length > 0) {
    var $icons = $('.circle__icon');
    var radius = $('.circle').width() / 2;

    $icons.each(function (i) {
      var radians = 2 * Math.PI * (i / $icons.length);
      vardegrees = (radians * radius) / Math.PI;

      $(this).css({
        top: radius + Math.cos(radians) * radius - $(this).width() / 2,
        left: radius + (-1 * (Math.sin(radians) * radius) - $(this).width() / 2),
      });
    });

    var is_icon_clicked = false;
    var degreeOfParent = 0,
      degreeOfIcon = 0;
    var differenceTabsCount = $('.circle__icon').length;
    var isAnimatingDifference = false;

    $('.circle__icon').on('click', function (e) {
      if (!$(this).hasClass('active')) {
        if (isAnimatingDifference) {
          return false;
        }

        var activeTabIndex = $('.circle__icon.active').index();
        var clickedTabIndex = $(this).index();

        var degreeToRotate = 360 / differenceTabsCount;
        var positionDifference = 0;

        var smallerOffsetTopsCount = 0;
        var clickedElementOffsetTop = $(this).offset().top;
        var clickedElementOffsetLeft = $(this).offset().left;

        var activeElementOffsetTop = $('.circle__icon.active').offset().top;
        var activeElementOffsetLeft = $('.circle__icon.active').offset().left;
        var offset_diff = 100;
        if ($(window).width() < 768) {
          offset_diff = 50;
        }

        $('.circle__icon').each(function () {
          if (clickedElementOffsetLeft >= activeElementOffsetLeft) {
            if (
              $(this).offset().top > clickedElementOffsetTop + offset_diff &&
              $(this).offset().left >= activeElementOffsetLeft
            ) {
              smallerOffsetTopsCount++;
            }
          } else {
            if (
              $(this).offset().top > clickedElementOffsetTop + offset_diff &&
              $(this).offset().left <= activeElementOffsetLeft
            ) {
              smallerOffsetTopsCount++;
            }
          }
        });
        positionDifference = smallerOffsetTopsCount;

        if ($(this).offset().left < $('.circle__icon.active').offset().left) {
          degreeOfParent = degreeOfParent - degreeToRotate * positionDifference;
          degreeOfIcon = degreeOfIcon + degreeToRotate * positionDifference;
        } else {
          degreeOfParent = degreeOfParent + degreeToRotate * positionDifference;
          degreeOfIcon = degreeOfIcon - degreeToRotate * positionDifference;
        }

        $('.circle__icon').css({ transform: 'rotate(' + degreeOfIcon + 'deg)' });
        $('.circle__list-icon').css({
          transform: 'rotate(' + degreeOfParent + 'deg)',
        });

        $('.circle__icon').removeClass('active');
        $(this).addClass('active');
        $('.circle__content').removeClass('active-content');
        $('#' + $(this).attr('data-item')).addClass('active-content');
        isAnimatingDifference = true;

        setTimeout(function () {
          isAnimatingDifference = false;
        }, 600);
      }
    });

    $('.circle__icon').on('hover', function (e) {
      if (e.originalEvent !== undefined) {
        clearInterval(pantusa_auto_rotation);
      }
    });

    $('.benefits__arrow').on('click', function (e) {
      if (e.originalEvent !== undefined) {
        clearInterval(pantusa_auto_rotation);
      }
      var activeDiffTabIndex = $('.circle__icon.active').index();
      activeDiffTabIndex = activeDiffTabIndex - 1;
      if (activeDiffTabIndex < 0) {
        activeDiffTabIndex = differenceTabsCount - 1;
      }
      $('.circle__icon').eq(activeDiffTabIndex).trigger('click');
    });

    var pantusa_auto_rotation = setInterval(function () {
      $('.benefits__arrow').trigger('click');
    }, 4000);
  }
});
