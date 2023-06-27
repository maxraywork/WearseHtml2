$(function () {
  gsap.registerPlugin(ScrollTrigger);

  isDesktop = window.innerWidth > 1024;

  //Fix for onload issue
  $(".no-transition").removeClass("no-transition");

  //Show hero section on load
  heroAnimation(true);
  function heroAnimation(isActive) {
    if (isActive) {
      $(".hero__video_wrapper").addClass("active");
      $(".hero__title.rise-by-line-animation").addClass("active");
    } else {
      $(".hero__video_wrapper").removeClass("active");
      $(".hero__title.rise-by-line-animation").removeClass("active");
    }
  }
  // Hide/show hero section after scroll
  ScrollTrigger.create({
    trigger: ".hero",
    start: "-100 top",
    end: "bottom 70%",
    onToggle: (self) => {
      heroAnimation(self.isActive);
    },
  });

  //Lettering animation
  $(".letters-animation").each(function () {
    let $this = $(this);
    $this.lettering();

    gsap.from($this.find("span"), {
      alpha: 0.2,
      stagger: 0.1,
      scrollTrigger: {
        trigger: $this,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  });

  //rise-by-line-animation
  if (isDesktop) {
    $(".rise-by-line-animation:not(.animation-by-class)").each(function () {
      let $this = $(this);

      gsap.from($this.find("span"), {
        yPercent: 150,
        rotate: 5,
        stagger: 0.3,
        scrollTrigger: {
          trigger: $this,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.4,
        },
      });
    });
  } else {
    //About mobile
    $(".about__text div span").each(function () {
      let $this = $(this);
      $this.lettering("words");
    });
    $(".about__text").each(function () {
      gsap.from($(this).find(".word"), {
        yPercent: 130,
        rotate: 4,
        stagger: 0.3,
        scrollTrigger: {
          trigger: this,
          start: "top 90%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
    });

    $(".title.rise-by-line-animation:not(.animation-by-class)").each(function () {
      let $this = $(this);

      gsap.from($this.find("span"), {
        yPercent: 150,
        rotate: 5,
        stagger: 0.3,
        scrollTrigger: {
          trigger: $this,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.4,
        },
      });
    });
  }

  //about__background_wrapper
  let backgroundImagesTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: $(".about__text_wrapper").eq(0),
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false
    },
  });
  let side;
  $(".about__background_wrapper > *").each(function (index) {
    if (side == undefined) {
      side = getRandomInt(1);
    }
    backgroundImagesTimeline.fromTo(
      this,
      {
        yPercent: 120,
        bottom: -100,
        xPercent:  Math.random() < 0.5 ? getRandomInt(30) : -getRandomInt(30),
        rotate: side ? getRandomInt(20) : -getRandomInt(20),
      },
      {
        yPercent: -getRandomInt(100),
        xPercent:  Math.random() < 0.5 ? getRandomInt(30) : -getRandomInt(30),
        bottom: "120%",
        rotate: side ? -getRandomInt(20) : getRandomInt(20),
      }
    , index == 0 ? null : index == 1 ? "<.4" : "<.2");
    side = !side;
  });

//About second text
let backgroundImagesTimeline2 = gsap.timeline({
  scrollTrigger: {
    trigger: $(".about__text_wrapper").eq(1),
    start: "top center",
    end: "bottom center",
    scrub: 1,
    markers: false
  },
});
$(".about__background_wrapper-2 > *").each(function (index) {
  backgroundImagesTimeline2.fromTo(
    this,
    {
      left: -100,
      top: () => gsap.utils.random(10, window.innerHeight - 100, 1)
    },
    {
      left: "100%",
      ease: 'linear'
    }
  , "<" + gsap.utils.random(.01, .2, .01));
});


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //work
  $(".work__item_wrapper").each(function () {
    let $this = $(this);

    let timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: $this,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
      .from($this.find(".work__title span"), {
        yPercent: 130,
        rotate: 4,
      })
      .from(
        $this.find(".work__text span"),
        {
          yPercent: 140,
          rotate: 4,
        },
        "<"
      );

    $this.find(".work__image").each(function () {
      timeline.from(this, {
        scale: 0,
        alpha: 0,
      });
    })

    //Hide back
    timeline.to($this.find(".work__title span"), {
      yPercent: 130,
      rotate: 4,
    }, ">2")
    .to(
      $this.find(".work__text span"),
      {
        yPercent: 140,
        rotate: 4,
      },
      "<"
    );

  $this.find(".work__image").each(function () {
    timeline.to(this, {
      scale: 0,
      alpha: 0,
    }, "<");
  });
  });

  //Blog
  let isHovered = false;
  let isFirstTime = true;
  let isMoved = false;

  $(".blog__item").hover(
    function () {
      if (!isMoved) {
        isHovered = true;
        isFirstTime = true;
        $(this).find(".blog__image").addClass("active");
      }
    },
    function () {
      if (!isMoved) {
        isHovered = false;
        isFirstTime = true;
        $(this).find(".blog__image").removeClass("active");
      }
    }
  );

  $(".blog__item").mousemove(function (event) {
    if (isHovered && !isMoved) {
      if (isFirstTime) {
        gsap.set($(this).find(".blog__image"), {
          top: event.clientY,
          left: event.clientX,
        });
        isFirstTime = false;
      } else {
        gsap.to($(this).find(".blog__image"), {
          top: event.clientY,
          left: event.clientX,
          duration: 0.5,
        });
      }
    }
  });

  function fixContainerHeight() {
    $(".contact_wrapper-sticky").removeAttr("style");

    $(".contact_wrapper").removeAttr("style");
    $(".contact_wrapper").height($(".contact_wrapper").height());

    $(".contact_wrapper-sticky > div").removeAttr("style");
    $(".contact_wrapper-sticky > div").height(
      $(".contact_wrapper-sticky > div").height()
    );
    ScrollTrigger.refresh();
  }
  $(window).resize(fixContainerHeight);
  $(".contact").imagesLoaded(function () {
    fixContainerHeight();
    gsap.from(".contact_wrapper-sticky", {
      height: 0,
      ease: "linear",
      scrollTrigger: {
        trigger: ".contact .title",
        start: () =>
          "bottom+=" +
          $(".contact").css("paddingBottom").split("px")[0] +
          " bottom",
        end: () => "bottom bottom",
        endTrigger: ".contact",
        markers: false,
        scrub: true,
      },
    });

    let timelineSmallBubble = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact .title",
        start: "bottom 70%",
        end: "bottom bottom",
        endTrigger: "html",
        scrub: 1,
        markers: false,
      },
    });
    timelineSmallBubble
      .from(".contact__text__bubble", {
        scale: 0,
      })
      .from(".contact__text > div > span", {
        yPercent: 140,
        rotate: 3,
        stagger: 1,
      })
      .from(".contact__text__bubble_text span", {
        yPercent: 140,
        rotate: 4,
        stagger: 0.5,
      })
      .from(
        ".contact__info_background",
        {
          scale: 0,
        },
        "<"
      )
      .from(
        ".contact__info__text a",
        {
          yPercent: 140,
          rotate: 4,
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".contact__info",
            start: "80% bottom",
            end: "bottom bottom",
            scrub: 0.5,
            markers: false,
          },
        },
        "<"
      )
      .from(".contact__info__social div a", {
        yPercent: 140,
        rotate: 3,
        stagger: 0.5,
      });
  });
});
