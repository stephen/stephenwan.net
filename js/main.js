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
$(preloader).on('load', function(e) {
  $('.pane#background div:first,footer,header h1,header h3,.pane#reveal').addClass('animate-in');
});


var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
var easeInOutCubic = function(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b
  return c/2*((t-=2)*t*t + 2) + b
}

$('a[href="#scraps"]').on('click', function(e) {
  $('#scraps').removeClass('hidden');
  $('#scraps article').addClass('animate-in');
  var startTime
  var startPos = root.scrollTop
  var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top
  var maxScroll = root.scrollHeight - window.innerHeight
  var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos
  var duration = 900
  var scroll = function(timestamp) {
    startTime = startTime || timestamp
    var elapsed = timestamp - startTime
    var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration)
    root.scrollTop = progress
    elapsed < duration && requestAnimationFrame(scroll)
  }
  requestAnimationFrame(scroll)
  e.preventDefault()
});

var $dotSpace = $('.dot'), spaceSize = 36;
for (var i = 0; i < spaceSize; i++) {
  var neuronHtml = '<div class="neuron" data-id="' + i + '""></div>';
  $dotSpace.append(neuronHtml);
}

setInterval(function() {
  var neuronId = Math.floor(Math.random() * spaceSize);
  var alive = Math.floor(Math.random() * 100);
  var $neuron = $('.dot .neuron[data-id="' + neuronId + '"]');
  $neuron.toggleClass(alive ? 'active' : 'dead');
}, 10);
