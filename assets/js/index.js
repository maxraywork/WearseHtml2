$(function () {
  gsap.registerPlugin(ScrollTrigger);

  //Fix for onload issue
  $(".no-transition").removeClass("no-transition");

  //Show hero section on load
  heroAnimation(true);
  function heroAnimation(isActive) {
    if (isActive) {
      $(".hero__video_wrapper").addClass("active");
      $(".rise-by-line-animation").addClass("active");
    } else {
      $(".hero__video_wrapper").removeClass("active");
      $(".rise-by-line-animation").removeClass("active");
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

    gsap.from($this.find('span'), {
        alpha: .4,
        stagger: .1,
        scrollTrigger: {
            trigger: $this,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
        }
    })

  });
});
