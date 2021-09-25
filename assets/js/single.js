let classesArr = [".hero div", ".column__description", ".title"]; //add classes
let classes = classesArr.join();
let classesSpan = "";

for (let i = 0; i < classesArr.length; i++) {
  if (i == classesArr.length - 1) {
    classesSpan += classesArr[i] + " span";
  } else {
    classesSpan += classesArr[i] + " span, ";
  }
}

$(document).ready(function () {

  $(classes).lettering();
  $('.hero').css("opacity", 1);
  
  for (let i = 0; i < $(".text__item").length; i++) {
    $(".triggers").append("<div></div>");
  }

  animation(document.querySelectorAll(".hero span"), true);

  if ($(window).width() > 800) {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "50% 20%",
      markers: false,
      onEnterBack: () => {
        animation(document.querySelectorAll(".hero span"), true);
      },
      onLeave: () => {
        animation(document.querySelectorAll(".hero span"), false);
      },
    });
    
    gsap.to(".we", {
      width: "50%",
      fontSize: "20vw",
      scrollTrigger: {
        trigger: ".text",
        start: "top 90%",
        end: "top top",
        scrub: 0.1,
        markers: false,
      },
    });
  } else {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "50% 20%",
      markers: false,
      onEnterBack: () => {
        animation(document.querySelectorAll(".hero span"), true);
      },
      onLeave: () => {
        animation(document.querySelectorAll(".hero span"), false);
      },
    });
    
    gsap.to(".we", {
      width: "50%",
      fontSize: "20vw",
      scrollTrigger: {
        trigger: ".text",
        start: "top 90%",
        end: "top top",
        scrub: 0.1,
        markers: false,
      },
    });
  }
    
  ScrollTrigger.create({
    trigger: "html",
    start: "top top",
    endTrigger: ".text",
    end: "bottom bottom",
    onLeave: () => {
      $(".we").addClass("ended");
    },
    onEnterBack: () => {
      $(".we").removeClass("ended");
    },
    markers: false,
  });

  let array = gsap.utils.toArray(".text__item");
  array.forEach((element, index) => {
    ScrollTrigger.create({
      trigger: ".triggers div:nth-child(" + (index + 1) + ")",
      start: "top 80%",
      end: "bottom 80%",
      onEnter: () => {
        $(".text__item:nth-child(" + (index + 1) + ")").addClass("on");
      },
      onLeave: () => {
        $(".text__item:nth-child(" + (index + 1) + ")").addClass("up");
        $(".text__item:nth-child(" + (index + 1) + ")").removeClass("on");
      },
      onLeaveBack: () => {
        $(".text__item:nth-child(" + (index + 1) + ")").removeClass("on");
      },
      onEnterBack: () => {
        $(".text__item:nth-child(" + (index + 1) + ")").removeClass("up");
        $(".text__item:nth-child(" + (index + 1) + ")").addClass("on");
      },
      markers: false,
    });
  });

  if ($(window).width() > 800) {

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".circles_wrap",
        start: "top 50%",
        end: "top 20%",
        scrub: 0.1,
        markers: false,
      },
    })
    .from(".circle:nth-child(3)", {
      x: 100,
      opacity: 0,
    })
    .from(".circle:nth-child(2)", {
      x: 100,
      opacity: 0,
    })
    .from(".circle:nth-child(1)", {
      x: 100,
      opacity: 0,
    });
  }
  else {
    gsap
    .timeline({
      scrollTrigger: {
        trigger: ".circles_wrap",
        start: "bottom bottom",
        end: "+150%",
        scrub: 0.1,
        pin: ".circles",
        markers: false,
      },
    })
    .from(".circle:nth-child(1)", {
      xPercent: 140,
    })
    .from(".circle:nth-child(2)", {
      xPercent: 140,
    })
    .from(".circle:nth-child(3)", {
      xPercent: 140,
    });
  }

  gsap.to(".select__flex", {
    x: () =>
      -($(".select__flex").width() - document.documentElement.clientWidth) +
      "px",
    ease: "none",
    scrollTrigger: {
      trigger: ".select",
      start: "bottom bottom",
      end: () => "+=" + $(".select__flex").width(),
      scrub: 0.1,
      pin: true,
    },
  });

  gsap.utils.toArray(".title").forEach((element, index) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top 60%",
      onEnter: () => {
        animation($(element).find("span"), true);
      },
    });
  });
});

function animation(obj, up) {
  var title1 = new TimelineMax();
  if (up) {
    title1.staggerTo(
      obj,
      1 /*<== change this number. This is seconds of the animation */,
      { ease: Power3.easeOut, opacity: 1, bottom: 0 },
      0.1 /*<== change this number. This is seconds of delay between the each element */
    );
    /* Also you can change "Power !!3!!" on any number between 1 to 4. Or you can put here a code from https://greensock.com/docs/v2/Easing */
  } else {
    title1.staggerTo(
      obj,
      0.8 /*<== change this number. This is seconds of the animation */,
      { ease: Power3.easeOut, opacity: 0, bottom: -50 },
      0.05 /*<== change this number. This is seconds of delay between the each element */
    );
    /* Also you can change "Power !!3!!" on any number between 1 to 4. Or you can put here a code from https://greensock.com/docs/v2/Easing */
  }
}
