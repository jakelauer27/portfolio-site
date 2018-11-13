$('.landing-button').click(()=> {
  $('html, body').animate({
    scrollTop: $('nav').offset().top
  }, 650);
})

let sectionHeaders = $.merge($('.section-header'), $('.header-line'));

/////Header Animations

$(window).scroll( () => {
  $(sectionHeaders).each((i, item) => {
    let distanceFromTop = $(window).scrollTop() - $(item).offset().top;
    if (distanceFromTop > -700) {
      $(item).addClass(`${item.classList[0]}-animation`);
      $(item).removeClass('none');
    }
  })
});

///About section Animations 

let aboutSections = [$('.left-climber'), $('.right-climber'), 
$('.profile-container'), $('.icon-container'), $('.graph-container'), $('.drumset')]

$(window).scroll( () => {
  aboutSections.forEach(item => {
    let distanceFromTop = $(window).scrollTop() - $(item).offset().top;
    if (distanceFromTop > -700) {
      $(item).addClass(`${item[0].classList[0]}-animation`);
      $(item).removeClass('none');
    }
  })
});

