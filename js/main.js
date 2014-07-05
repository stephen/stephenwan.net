function isTouchDevice() {
   return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

var FrontpageManager = function() {
  var self = this;
  self.map = [
    { bg: '/static/sand.jpg', action: 'constructs &amp; destructs', center: '50% 20%' },
    { bg: '/static/night.jpg', action: 'is the night', center: '50% 50%' },
    { bg: '/static/boat.jpg', action: 'is on a boat', center: '50% 50%' },
    { bg: '/static/sunset.jpg', action: 'watches sunsets', center: '50% 50%' },
    { bg: '/static/batman.jpg', action: 'fights crime', center: '50% 50%' },
    { bg: '/static/chair.jpg', action: 'sits in chairs', center: '50% 50%' },
    { bg: '/static/hacktx.jpg', action: 'hacks texas', center: '50% 50%' },
    { bg: '/static/duck.jpg', action: 'quacks (sometimes)', center: '50% 50%' },
    { bg: '/static/hario.jpg', action: 'makes coffee', center: '50% 50%' },
    { bg: '/static/bed.jpg', action: 'sleeps much', center: '50% 50%' },
    { bg: '/static/michelle.jpg', action: 'enjoys beauty', center: '50% 50%' },
    { bg: '/static/library.jpg', action: 'owns books', center: '50% 20%' },
  ];
  self.last = { bg: '/static/sparks.jpg', action: 'would like to meet you', center: '50% 50%' };
};

FrontpageManager.prototype.show = function(index) {
  var item = this.map[index];
  if (this.map.length == 0) {
    item = this.last;
    $('#frontpage .action').unbind('click').click(function() {
      window.location = 'mailto:stephen@stephenwan.net';
    });
  }

  this.currentImg = item.bg;
  $('#frontpage').css('background-image', "url('" + item.bg + "')");
  $('#frontpage .action').html(item.action);
  this.map.splice(index, 1);
};

FrontpageManager.prototype.showRandom = function() {
  this.show(Math.floor(Math.random() * this.map.length));
};

$(document).ready(function() {

  var fpMan = new FrontpageManager();
  fpMan.showRandom();

  var mainBackground = new Image();
  $(mainBackground).load(function() {
    $('.page#loading').css('opacity', 0);
    $('.heading').addClass('animate-in');
    
    if (isTouchDevice()) {
      // on mobile, show after small delay
      setTimeout(function() {
        $('footer').addClass('animate-in');
      }, 500);

      $('.scene').parallax({
        calibrateX: false,
        calibrateY: true
      });

    } else {
      // on non-mobile, show when mouse moves
      $('body').one('mousemove', function() {
        setTimeout(function() {
          $('footer').addClass('animate-in');
        }, 500);
      });

    }

    // preload the rest!
    fpMan.map.forEach(function(element) {
      $('<img/>')[0].src = element.bg;
    });

    $('<img/>')[0].src = fpMan.last.bg;

  });

  // preload first image
  mainBackground.src = fpMan.currentImg;

  $('.tagline').click(function() {
    $('#frontpage .action').fadeIn(100);
    $(this).fadeOut(100);
    return false;
  });

  $('#frontpage a.action').click(function() {
    fpMan.showRandom();
  });

});
