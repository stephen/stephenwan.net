var heroSlides = [
  { bg: '/static/sand.jpg', action: 'constructs &amp; destructs' },
  { bg: '/static/night.jpg', action: 'is the night' },
  { bg: '/static/sunset.jpg', action: 'watches sunsets' },
  { bg: '/static/batman.jpg', action: 'fights crime' },
  { bg: '/static/chair.jpg', action: 'sits in chairs' },
  { bg: '/static/hacktx.jpg', action: 'hacks texas' },
  { bg: '/static/duck.jpg', action: 'quacks (sometimes)' },
  { bg: '/static/hario.jpg', action: 'makes coffee' },
  { bg: '/static/bed.jpg', action: 'sleeps a lot' },
  { bg: '/static/michelle.jpg', action: 'has possessions' },
  { bg: '/static/library.jpg', action: 'owns books' }
];

heroSlides.push({ bg: '/static/sparks.jpg', action: 'would like to meet you' });

// helpers
var template = _.template($('#pane-background-template').text());
var displaySlide = function(slide) {
  var content = template({
    src: slide.bg
  });

  $('.pane#background').append(content);
};

// choose slide + show
var slide = _.sample(heroSlides);
displaySlide(slide);

var preloader = new Image();
preloader.src = slide.bg;

// start animations on load
$(preloader).on('load', function() {
  $('.pane#background div:first,footer,header,.pane#reveal').addClass('animate-in');
});

$('a[href="#scraps"]').on('click', function() {
  $('#scraps').removeClass('hidden');
});
