$('.landing-button').click(()=> {
  $('html, body').animate({
    scrollTop: $('nav').offset().top
  }, 650);
})

$('.nav-item').on('click', (e) => {
  navScroll(e.target.id)
})

function navScroll(section) {
  $('html, body').animate({
    scrollTop: $(`.${section}`).offset().top - 60
  }, 550);
}

///Scrolling Animations 

let sections = [$('.about-section-header'), $('.about-section-header-line'), $('.portfolio-section-header'),
$('.portfolio-section-header-line'), $('.left-climber'), $('.right-climber'), 
$('.profile-container'), $('.icon-container'), $('.graph-container'), $('.drumset'), 
$('.wheel-project'), $('.smash-project'), $('.animate-project'), $('.piano')]

$(window).scroll( () => {
  sections.forEach((item, i) => {
    let distanceFromTop = $(window).scrollTop() - $(item).offset().top;
    if (distanceFromTop > -650) {
      $(item).addClass(`${item[0].classList[0]}-animation`);
      $(item).removeClass('none');
      sections.splice(i, 1)
    }
  })

  ////// Link Highlighting
  let pos = $(window).scrollTop();

  if (-75 < pos - $('.home').offset().top) { highlightLink('#home'); }
  if (-75 < pos - $('.about').offset().top) { highlightLink('#about'); }
  if (-75 < pos - $('.portfolio').offset().top) { highlightLink('#portfolio'); }
  if (-75 < pos - $('.talks').offset().top) { highlightLink('#talks'); }
  if (-75 < pos - $('.connect').offset().top) { highlightLink('#connect'); }

  function highlightLink(link) {
    $('nav .highlight').removeClass('highlight');
    $("nav").find(link).addClass('highlight');
  }
});

/////Project Popup

let currentSlide = 0;

$('.portfolio-section').on('click', (e) => {
  if (e.target.classList.contains('learn-more-btn')) {
    displayPopup(e.target.classList[2]);
  }
})

let arrowDisabled = false;

$('.project-popup').on('click', (e) => {
  if (e.target.classList.contains('x-button')) {
    hidePopup(e.target.classList[3]);
  }
  if (e.target.classList.contains('right-arrow') && !arrowDisabled) {
    imageSlide(1, $(e.target).siblings('.popup-content-container').children('.x-button')[0].classList[3]);
    arrowDisabled = true;
  }
  if (e.target.classList.contains('left-arrow') && !arrowDisabled) {
    imageSlide(-1, $(e.target).siblings('.popup-content-container').children('.x-button')[0].classList[3]);
    arrowDisabled = true;
  }

})

$('.dark-overlay').on('click', () => {
  $('.project-popup').each((i, popup) => {
    $(popup).addClass('hide');
  })
  $('.dark-overlay').addClass('hide');
})

function hidePopup(project) {
  $(`.${project}-popup`).addClass('hide')
  $(`.${project}-popup`).removeClass('popup-animation')
  $('.dark-overlay').addClass('hide');
  currentSlide = 0;
}

function displayPopup(project) {
  $(`.${project}-popup`).removeClass('hide');
  $(`.${project}-popup`).addClass('popup-animation');
  $('.dark-overlay').removeClass('hide');
}

function imageSlide(direction, project) {
  let slides = $(`.${project}-image`);
  let slideOutDirection = '';
  let slideInDirection = '';
  let lastSlide = $(slides[currentSlide]);

  direction < 0 ? slideOutDirection = 'slideOutLeft' : slideOutDirection = 'slideOutRight';

  $(lastSlide).addClass(slideOutDirection)
  setTimeout( () => {
    $(lastSlide).addClass('hide');
    $(lastSlide).removeClass(slideOutDirection);
    arrowDisabled = false;
  }, 400)

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  $(slides[currentSlide]).removeClass('hide');
  direction < 0 ? slideInDirection = 'slideInRight' : slideInDirection = 'slideInLeft';
  $(slides[currentSlide]).addClass(slideInDirection)
  setTimeout( () => {
    $(slides[currentSlide]).removeClass(slideInDirection);
  }, 400)
}