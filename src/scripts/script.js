var generateStars = function () {
  var
    docWidth = $(document).width(),
    docHeight = $(document).height(),
    starNumber = Math.floor(docWidth * docHeight / 3000);

  $('#stars, #comet').attr({
      width: docWidth,
      height: docHeight,
  });

  for (var i = 0; i < starNumber; i++) {
    var size = Math.floor(Math.random()*3);
    $("#stars").drawEllipse({
      layer: true,
      group: ['stars'],
      width: size,
      height: size,
      y: Math.floor(Math.random()*docHeight),
      x: Math.floor(Math.random()*docWidth),
      fillStyle: "#fff"
    });
  }
  $('#comet').click(function(event){comet(event);});
};

var comet = function (e) {
  $('#comet').drawEllipse({
    layer: true,
    name: "comet",
    group: ['comet'],
    width: 1,
    height: 1,
    y: 0,
    x: 0,
    fillStyle: "#fff"
  });

  $('#comet').animateLayer('comet', {
    width: 0,
    y: e.clientY-100,
    x: e.clientX-100,
    rotate: 45,
    opacity: 0
  },0).animateLayer('comet', {
    width: 100,
    y: e.clientY,
    x: e.clientX,
    opacity: 0.4
  },300, 'linear').animateLayer('comet', {
    width: 0,
    y: '+=300',
    x: '+=300',
    opacity: 0
  },600);
};


var initNav = function() {
  var $links = $('.menu a');

  $links.on('click', function(e) {
    var contentClass = $(this).attr('href').split('#').pop();
    $links.removeClass('current');
    $(this).addClass('current');

    $('.content').each( function(){
      if ($(this).hasClass(contentClass) && $(this).is(':hidden')) {
        $(this).velocity("transition.slideUpIn", {duration: 500});
      } else if ($(this).is(':visible')) {
        $(this).velocity('transition.slideUpOut', {duration: 300});
      }
    });
  });
};


var initForm = function () {
  $('.js-form').on('submit', function() {
    var
      email = $(this).find('[name=email]').val(),
      message = $(this).find('[name=message]').val();

    $.post('contact.php', { email: email, message: message }, function(data)
    {
      if (data == 'ok')
        $('.alert').text('Votre email a bien été envoyé').slideDown();
      else
        $('.alert').text('Votre email n\'as pas pu être envoyé').slideDown();
    });
    return false;
  });
};

var loadArticles = function() {
  var
    blogContainer = $('.blog'),
    formatedArticles = "";

  $.ajax({
    url:"https://www.kimonolabs.com/api/8b32r1qc?apikey=00000000000000000000000000000000",
    crossDomain: true,
    dataType: "jsonp",
    success: function (response) {
      var articles = response.results.blog;

      for (var i = 0; i <= response.count - 1; i++) {
        formatedArticles += (
          "<li><a href='" + articles[i].title.href + "'>" +
          articles[i].title.text + "</a><span class='date'>[" +
          articles[i].date[0] + "/" +
          articles[i].date[1] + "/" +
          articles[i].date[2] +
          "]</span>" +
          "<p class='thumb'>" + articles[i].thumb + "</p></li>"
        );
      }
    },
    error: function (xhr, status) {
      formatedArticles = "Aucun article à afficher pour le moment.";
    }
  });

  blogContainer.append(formatedArticles);

};

$(document).ready( function (){
  $('body.no-js').removeClass('no-js'); // Check if js is available

  initNav();
  initForm();
  generateStars();
  loadArticles();
});