var navigation = {
  // Variables
  $nav: document.querySelector(".nav"),
  $navContent: document.querySelector(".nav__body"),
  $navTrigger: document.querySelector(".header__button"),
  transitionEnd:
    "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",

  init: function init() {
    var self = this;

    // Handle the transitions
    self.$navTrigger.addEventListener("click", function () {
      if (!self.$navTrigger.classList.contains("is-active")) {
        // .nav--trigger active
        self.$navTrigger.classList.add("is-active");

        if (!self.$nav.classList.contains("nav_active")) {
          self.$nav.classList.add("nav_active");
          self.$nav.addEventListener("transitionend", function (e) {
            if (e.propertyName == "width" && self.$navTrigger.classList.contains('is-active')) {
              // .nav__content active
              self.$navContent.classList.add("nav__body_active");
            }
          });
        } else {
          self.$navContent.classList.add("nav__body_active");
        }
      } else {
        self.$navTrigger.classList.remove("is-active");
        if (self.$navContent.classList.contains("nav__body_active")) {
          self.$navContent.classList.remove("nav__body_active");
          self.$navContent.addEventListener("transitionend", function (e) {
            if (e.propertyName == "opacity" && !self.$navTrigger.classList.contains('is-active')) {
              // .nav__content active
              self.$nav.classList.remove("nav_active");
            }
          });
        } else {
          self.$nav.classList.remove("nav_active");
        }
      }
    });
  },
};

navigation.init();
