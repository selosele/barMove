/*-------------------------------------------------
barMove
Version : 1.0
Author : Sehyun oh
Github : https://github.com/selosele/barMove
-------------------------------------------------*/

if (typeof jQuery === "undefined") throw new Error("jQuery is not defined.");

(function($) {
  $.fn.moveBar = function(options) {
    return this.each(function() {
      var option = $.extend({
        width: $(this).children().outerWidth(), // bar의 width
        height: null, // bar의 height
        top: $(this).children().offset().top + $(this).children().outerHeight(true), // bar의 top
        event: "mouseover", // 이벤트
        duration: 100, // 지연 시간
        addClass: null, // bar가 움직일 때 추가할 class
        afterMove: null, // bar가 움직인다음 실행할 함수
      }, options);
      
      $(this).after("<span class='js-moveBar-bar'></span>");
      
      var $bar = $(this).next(".js-moveBar-bar"),
          $barChild = $(this).children();
      
      $bar
        .css({
          "display": "none",
          "position": "absolute",
          "top": option.top,
          "width": option.width,
          "height": option.height,
        })
        .attr({"aria-hidden": "true"});
      
      $barChild.on(option.event, function(event) {
        $barChild.not($(this)).removeClass(option.addClass);
        $(this).addClass(option.addClass);
        
        if (!$bar.is(":visible")) {
          $bar.css("display", "inline-block");
        }
        
        $bar.stop().animate({"left": $(this).offset().left}, option.duration);
        
        if (option.afterMove) {
          option.afterMove.call($(this), event);
        }
      });
    });
  }
})(jQuery);