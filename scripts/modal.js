$(document).ready(function() {
    // MODAL
    var modalText = {
      travel: {
        title: 'Travel Portal',
        tag: 'Travel',
        detail:
          'Flight and Hotel Booking website. User are provided to search, and book flights and hotel',
      },
      moms: {
        title: 'Momskart',
        tag: 'ONLINE ORDERING SOLUTION.',
        detail:
          'Ecommerce website to connect people with the local vendors directly to buy their products.',
        link: 'https://themomskart.com'
      },
      'accepted-risk': {
        title: 'Accepted Risk',
        tag: 'Real Time Risk Management Tool',
        detail: 'Monitor social media, clearnet and darknet for specific accounts, sites or keywords, and receive live updates just as things happen. Anticipate and prevent disruptions to your operations by locating people and assets at risk and executing triage immediately, even with built-in third-party physical resources, globally.',
        link: 'https://acceptedrisk.com/'
      },
      geo: {
        title: 'Contruction Planning',
        tag: 'contruction',
        detail:
          `An application to let users plan, create and excute roadmaps. The application uses leaflet js. Toolbox to create map elements.
          Map layer management. Application is used to integrate with ERP module.`
      },
      ads: {
        title: 'Track advertisement',
        tag: 'Main stream media',
        detail:
          `A web application to allow media agencies to track records of advertisements of their client's brand.
          The goal was to automate the monitoring and reporting system`
      },
      analytics: {
        title: 'Social Media Analytics',
        tag: 'social-media',
        detail:
          `A web application to allow media agencies to track their performance in social media such as facebook, instagram, youtube, twitter, google analytics, google admanager etc.
          Analytics tool for monitoring pacing, track campaigns, track companies fianancial earning trends`
      },
      chatbot: {
        title: 'Telegram Bot With Inventory Management Admin',
        tag: 'Chat Bot',
        detail:
          'A chat bot that allows users to buy products from Telegram. The datasource is supported by an inventory management system ',
        link: 'http://www.roambi.com'
      },
      tcs: {
        title: 'Adminstration For Open-TCS',
        tag: 'PERFORMANCE METRICS.',
        detail:
          'Administrations system and database management for Open-TCS. Follow the provided link for a full case study.',
          link: 'https://docs.google.com/document/d/1IH3YvNi1CkqCMAtHNnRHfojLaHP7nZEEGKB9rf6wyHA/edit?usp=sharing'
      
      },
      map: {
        title: 'Covid-19 Cases Analysis',
        tag: 'COVID-19.',
        detail:
          'Analytics tool to monitor the trend of covid cases from the begining in global level.'
      },
      mystand: {
        title: 'MyStand',
        tag: 'CROWD-FUNDED CHARITY.',
        detail:
          'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.'
      },
      deeptrack: {
        title: 'DeepTrack Based On Traccar',
        tag: 'Geofence.',
        detail:
          'Web based application to track users location. Notification broadcasting on events like a user enters or leave geofence.'
      },
      themall: {
        title: 'The Mall',
        tag: 'PEER GUIDED SHOPPING.',
        detail:
          'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.'
      }
    };
  
    $('#gallery .button').on('click', function() {
      fillModal(this.id);
      $('.modal-wrap').addClass('visible');
    });
  
    $('.close').on('click', function() {
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    $('.mask').on('click', function() {
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth / 3,
      dragStart,
      dragEnd;
  
    setDimensions();
  
    $('#next').click(function() {
      shiftSlide(-1);
    });
    $('#prev').click(function() {
      shiftSlide(1);
    });
  
    carousel.on('mousedown', function() {
      if (carousel.hasClass('transition')) return;
      dragStart = event.pageX;
      $(this).on('mousemove', function() {
        dragEnd = event.pageX;
        $(this).css('transform', 'translateX(' + dragPos() + 'px)');
      });
      $(document).on('mouseup', function() {
        if (dragPos() > threshold) {
          return shiftSlide(1);
        }
        if (dragPos() < -threshold) {
          return shiftSlide(-1);
        }
        shiftSlide(0);
      });
    });
  
    function setDimensions() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        slideWidth = $(window).innerWidth();
      }
      $('.carousel-wrap, .slide').css('width', slideWidth);
      $('.modal').css('max-width', slideWidth);
      $('#carousel').css('left', slideWidth * -1);
    }
  
    function dragPos() {
      return dragEnd - dragStart;
    }
  
    function shiftSlide(direction) {
      if (carousel.hasClass('transition')) return;
      dragEnd = dragStart;
      $(document).off('mouseup');
      carousel
        .off('mousemove')
        .addClass('transition')
        .css('transform', 'translateX(' + direction * slideWidth + 'px)');
      setTimeout(function() {
        if (direction === 1) {
          $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
          $('.slide:last').after($('.slide:first'));
        }
        carousel.removeClass('transition');
        carousel.css('transform', 'translateX(0px)');
      }, 700);
    }
  
    function fillModal(id) {
      $('#modal .title').text(modalText[id].title);
      $('#modal .detail').text(modalText[id].detail);
      $('#modal .tag').text(modalText[id].tag);
      if (modalText[id].link)
        $('#modal .button')
          .addClass('visible')
          .parent()
          .attr('href', modalText[id].link);
  
      $.each($('#modal li'), function(index, value) {
        $(this).text(modalText[id].bullets[index]);
      });
      $.each($('#modal .slide'), function(index, value) {
        $(this).css({
          background:
            "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
          backgroundSize: 'cover'
        });
      });
    }
  });