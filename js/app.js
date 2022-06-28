document.addEventListener('DOMContentLoaded', function () {
  // Menu
  function menu() {
    const menuBG = document.querySelector('.header');
    const menuBody = document.querySelector('.header__body');
    const whiteSpace = document.querySelector('.white-space');
    const logo = document.querySelector('.header__logo');
    const mobileMenuBody = document.querySelector('.burger-menu__content');
    const linksBody = document.querySelector('.nav__links');
    const links = document.querySelectorAll('.nav__link');

    const checkbox = document.querySelector('.checkbox');
    const mobileMenuButton = document.querySelector('.burger-menu__button');
    const backdrop = document.querySelector('.backdrop');

    const backgroundColor = 'rgb(250, 250, 250)';

    $(window).on('load resize', () => {
      whiteSpace.style.width = logo.clientWidth + 'px';
    });
    // Переміщаю навігацію до бургер меню
    function moveLinksToOtherBlock() {
      $(window).on('load resize', () => {
        if ($(this).width() <= 992) {
          $(linksBody).prependTo($(mobileMenuBody));
        } else {
          $(linksBody).appendTo($(menuBody));
          $(whiteSpace).appendTo($(menuBody));
        }
      });
    }
    moveLinksToOtherBlock();

    // Відкриваю меню при нажимані
    function showMenuMobile() {
      // Анімація відкриття для меню
      function slideRight() {
        // Ширина від 992px до 376px
        if ($(window).width() <= 992 && $(window).width() > 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
            $(menuBG).css('background', 'none');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }
        }

        // Ширина від 376px до 0px
        else if ($(window).width() <= 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
            $(menuBG).css('background', 'none');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }
        }

        // Ширина від 992px і вище
        else {
          $(backdrop).removeClass('backdrop-active');
          $(menuBG).css('background', backgroundColor);
        }
      }

      // Ховаю меню при ресайзі
      function closeMenuHover() {
        $(window).on('resize', function () {
          $(checkbox).prop('checked', false);

          // Ширина від 992px до 376px
          if ($(window).width() <= 992 && $(window).width() > 400) {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }

          // Ширина від 376px до 0px
          else if ($(window).width() < 400) {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }

          // Ширина від 992px і вище
          else {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }
        });
      }
      closeMenuHover();

      // Показую меню при нажиманні на кнопку
      mobileMenuButton.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });

      // Ховаю меню при нажиманні на силку
      links.forEach(function (link, i) {
        link.addEventListener('click', function () {
          slideRight();
          $(checkbox).prop('checked', !$(checkbox).prop('checked'));
        });
      });

      backdrop.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });
    }
    showMenuMobile();
  }
  menu();

  // Hero padding top
  function heroPaddingTop() {
    const heroSection = document.querySelector('.hero');
    const headerHeight = document.querySelector('.header').clientHeight;

    heroSection.style.paddingTop = headerHeight + 'px';
  }
  heroPaddingTop();

  // Benefits Cards Height
  function benefitsCardsHeight() {
    const cardsText = document.querySelectorAll('.b-cards-block__wrapper-text .b-cards-block__body');
    const cardsImage = document.querySelectorAll('.b-cards-block__wrapper-image .b-cards-block__body');

    $(window).on('load resize', () => {
      const cardsHeigh = Array.from(cardsText).map((card) => card.clientHeight);
      const maxImageCardHeight = Math.max(...cardsHeigh);

      if ($(window).width() > 768) {
        cardsText.forEach((card) => {
          card.style.minHeight = maxImageCardHeight + 'px';
        });

        cardsImage.forEach((card) => {
          card.style.height = maxImageCardHeight + 'px';
        });
      } else {
        cardsText.forEach((card) => {
          card.style.height = 'auto';
        });

        cardsImage.forEach((card) => {
          card.style.height = '600px';
        });
      }
    });
  }
  benefitsCardsHeight();

  // Scroll to sections
  function scrollToSection() {
    const anchors = document.querySelectorAll('a[href^="#s-"]');

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute('href'); // Отримую силки з назвами блоків до яких буду скролити

        $('html,body').animate({ scrollTop: $('' + blockID).offset().top - 40 + 'px' }, 500);
      });
    }
  }
  scrollToSection();

  // Scroll to hero section
  function scrolToHero() {
    const headerLink = document.querySelector('.header__logo');
    headerLink.addEventListener('click', (e) => {
      e.preventDefault;
      seamless.scrollIntoView(document.querySelector('#s-hero'), {
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
  scrolToHero();

  // Scroll to hero section (footer)
  const headerLink2 = document.querySelector('.footer__logo');
  headerLink2.addEventListener('click', (e) => {
    e.preventDefault;
    seamless.scrollIntoView(document.querySelector('#s-hero'), {
      behavior: 'smooth',
      block: 'start',
    });
  });

  // // Активний клас для меню при скролі
  function activeClassMenu() {
    const menuLinks = document.querySelectorAll('.link a[href^="#s-"]');
    const sections = document.querySelectorAll('section');
    $(window).on('scroll load', () => {
      const scrollTop = scrollY;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollTop + 500) {
          menuLinks.forEach((link) => {
            if (link.getAttribute('href').replace('#', '') === section.getAttribute('id')) {
              link.classList.add('link-active');
            } else {
              link.classList.remove('link-active');
            }
          });
        }
      });
    });
  }
  activeClassMenu();

  //  AOS.init({
  //    // Global settings:
  //    once: true,
  //    duration: 1000,
  //    delay: 100,
  //    anchorPlacement: 'top',
  //  });
});
