$(function () {
  gsap.registerPlugin(ScrollTrigger);

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

  //about__background_wrapper

  let backgroundImagesTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
    },
  });

  backgroundImagesTimeline.fromTo(
    ".about__background_wrapper div",
    {
      yPercent: 120,
    },
    {
      yPercent: -120,
      ease: "linear",
    }
  );
  let side;
  $(".about__background_wrapper div > *").each(function () {
    if (side == undefined) {
        side = getRandomInt(1);
    }
    backgroundImagesTimeline.fromTo(
      this,
      {
        yPercent: getRandomInt(25),
        rotate: side ? getRandomInt(15) : -getRandomInt(15),
      },
      {
        yPercent: -getRandomInt(40),
        rotate: side ? -getRandomInt(15) : getRandomInt(15),
      },
      "<"
    );
    side = !side;
  });
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
});
