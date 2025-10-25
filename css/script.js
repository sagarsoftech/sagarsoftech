
/* jQuery interactions */
$(function(){
  // Preloader
  $(window).on('load', function(){ $('#preloader').fadeOut(250); });

  const $header = $('.site-header');
  const $menu = $('.nav .menu');
  const $toggle = $('.nav-toggle');

  // Mobile nav toggle
  $toggle.on('click', function(){
    const open = $('.nav').toggleClass('open').hasClass('open');
    $toggle.attr('aria-expanded', open);
  });

  // Smooth scroll for nav links
  $('a[href^="#"]').on('click', function(e){
    const target = $(this.getAttribute('href'));
    if(target.length){
      e.preventDefault();
      const y = target.offset().top - 64; // account for sticky header
      $('html, body').animate({scrollTop: y}, 450);
      $('.nav').removeClass('open');
      $toggle.attr('aria-expanded', false);
    }
  });

  // Header shadow on scroll & back to top
  const $back = $('#backToTop');
  const onScroll = () => {
    const sc = $(window).scrollTop();
    $header.toggleClass('scrolled', sc > 10);
    if(sc > 300){ $back.fadeIn(150); } else { $back.fadeOut(150); }
  };
  $(window).on('scroll', onScroll); onScroll();
  $back.on('click', () => $('html, body').animate({scrollTop:0}, 450));

  // Scrollspy active link
  const sections = $('section[id]');
  const links = $('.nav-link');
  $(window).on('scroll', function(){
    let current = '';
    sections.each(function(){
      const top = $(this).offset().top - 80;
      if($(window).scrollTop() >= top){ current = this.id; }
    });
    links.removeClass('active');
    if(current){ links.filter(`[href="#${current}"]`).addClass('active'); }
  });

  // Accordion (FAQ)
  $('.acc-trigger').on('click', function(){
    const $btn = $(this);
    const panelId = $btn.attr('aria-controls');
    const $panel = $('#' + panelId);
    const expanded = $btn.attr('aria-expanded') === 'true';
    $btn.attr('aria-expanded', !expanded);
    if(expanded){ $panel.slideUp(180, () => $panel.attr('hidden', true)); }
    else { $panel.hide().attr('hidden', false).slideDown(180); }
  });

  // Contact form (client-side demonstration)
  $('#contactForm').on('submit', function(e){
    e.preventDefault();
    let ok = true;
    $(this).find('.error').text('');

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();

    if(name.length < 2){ $('#name').next('.error').text('Please enter your name.'); ok=false; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ $('#email').next('.error').text('Enter a valid email.'); ok=false; }
    if(message.length < 10){ $('#message').next('.error').text('Please enter at least 10 characters.'); ok=false; }

    if(!ok) return;

    $('#formStatus').text('Sending…');
    setTimeout(function(){
      $('#formStatus').text('Thanks! Your message has been sent.');
      $('#contactForm')[0].reset();
    }, 600);
  });

  // Reveal on scroll
  const reveal = function(){
    $('.reveal').each(function(){
      const $el = $(this);
      const rect = this.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80){ $el.addClass('in'); }
    });
  };
  reveal();
  $(window).on('scroll resize', reveal);

  // Footer year
  $('#year').text(new Date().getFullYear());
});
