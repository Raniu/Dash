$(document).ready( function() {
  "use strict";
  var scrolltoOffset = $('#header').outerHeight() - 15;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    var scrolltoOffset = $('#header').outerHeight() - 15;

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 150, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });
  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  //클릭했을 때 스르륵 올라가도록 애니메이션 효과를 줌
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 150, 'easeInOutExpo');
    return false;
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }

   document.oncontextmenu=function(){return false;} // 우클릭 방지

  $("#headers").load("/common/header.html",function(){
    //html 주소
    var url = $(location).attr('pathname');
    console.log(url);
    // "/"로 주소 분리
    var strArray = url.split("/");
    console.log(strArray);
    console.log(strArray.length);
    //주소 베열이 1이 ICT 이면
    //주소로 넘겨받은 dept 파라미터의 값이 ict 라면.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dept = urlParams.get('dept');
    console.log(dept);
    // if(dept == "ict"){
    //     $("#headers").load("/common/header4.html",function(){
    //       $(".logo2").text('쿨스 ICT');
    //       //header.html 맨 밑에 nav2가 실행되어 header2.html을 불러온다.
    //       $(".nav2").load("/common/header2.html");
    //     });
    // }
    if(strArray[1] == "ICT"){
      $("#headers").load("/common/header4.html",function(){
        $(".logo2").text('쿨스 ICT');
        //header.html 맨 밑에 nav2가 실행되어 header2.html을 불러온다.
        $(".nav2").load("/common/header2.html");
      });
      }
    // 그렇지 않으면 nav3이 실행되어 header3.html을 불러온다.
    // $(".nav3").load("/common/header_01_01.html");
  });
  $("#footer").load("/common/footer.html", function(){
    // html 주소
    var url = $(location).attr('pathname');
    // console.log(url);
    // "/"로 주소 분리
    var strArray = url.split("/");
    // console.log(strArray);
    // console.log(strArray.length);
    //주소 베열이 1이 ICT 이면
    if(strArray[1] == "ICT"){
      //header.html 맨 밑에 nav2가 실행되어 header2.html을 불러온다.
      $(".footers_img").load("/common/footer_img.html");
    }
    aos_init();
    onLoad();

  });

    function onLoad(){
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav1').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');

      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });

      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });

      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
   }
  });



  // Navigation active state on scroll
  // var nav_sections = $('section');
  // var main_nav = $('.nav-menu2, #mobile-nav');
  //
  // $(window).on('scroll', function() {
  //   var cur_pos = $(this).scrollTop() + 200;
  //
  //   nav_sections.each(function() {
  //     var top = $(this).offset().top,
  //       bottom = top + $(this).outerHeight();
  //
  //     if (cur_pos >= top && cur_pos <= bottom) {
  //       if (cur_pos <= bottom) {
  //         main_nav.find('li').removeClass('active');
  //       }
  //       main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
  //     }
  //   });
  // });
