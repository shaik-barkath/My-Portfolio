$(document).ready(function () {
  /* =========================================================
     1. Sticky navbar + scroll-up button
     ========================================================= */
  $(window)
    .on("scroll", function () {
      const y = $(window).scrollTop();
      $(".navbar").toggleClass("sticky", y > 20);
      $(".scroll-up-btn").toggleClass("show", y > 500);
    })
    .trigger("scroll");

  $(".scroll-up-btn").on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================
     2. Mobile menu (hamburger)
     ========================================================= */
  const $menu = $(".navbar .menu");
  const $icon = $(".navbar .max-width > .menu-btn i");

  // open / close with the hamburger button
  $(".navbar .max-width > .menu-btn").on("click", function () {
    $menu.toggleClass("active");
    $icon.toggleClass("active");
  });

  // close the menu after tapping a link
  $(".navbar .menu li a").on("click", function () {
    $menu.removeClass("active");
    $icon.removeClass("active");
  });

  /* =========================================================
     3. Typing animation
     ========================================================= */
  if (typeof Typed !== "undefined") {
    const roles = [
      "Java Developer",
      "Spring Boot Developer",
      "Backend Developer",
      "SQL Developer",
    ];

    new Typed(".typing", {
      strings: roles,
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    new Typed(".typing-2", {
      strings: roles,
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }

  /* =========================================================
     4. Education carousel
     ========================================================= */
  if ($.fn.owlCarousel) {
    $(".carousel").owlCarousel({
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1, nav: false },
        600: { items: 2, nav: false },
        1000: { items: 3, nav: false },
      },
    });
  }

  /* =========================================================
     5. Contact form validation
     ========================================================= */
  const form = document.getElementById("form-data");
  if (!form) return;

  // let our own validation run instead of the browser's default popups
  form.noValidate = true;

  const nameInput = form.querySelector(".field.name input");
  const emailInput = form.querySelector(".field.email input");
  const subjectInput = form.querySelector(
    ".field:not(.name):not(.email):not(.textarea) input"
  );
  const textareaInput = form.querySelector(".textarea textarea");

  function validateName(name) {
    return name.trim() !== "";
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  function validateSubject(subject) {
    return subject.trim() !== "";
  }

  function validateTextarea(message) {
    return message.trim() !== "";
  }

  const rules = [
    { el: nameInput, valid: validateName },
    { el: emailInput, valid: validateEmail },
    { el: subjectInput, valid: validateSubject },
    { el: textareaInput, valid: validateTextarea },
  ];

  // returns true/false and colours the border red when invalid
  function check(rule) {
    if (!rule.el) return true;
    const ok = rule.valid(rule.el.value);
    rule.el.style.borderColor = ok ? "" : "red";
    return ok;
  }

  // clear the red border as soon as the user fixes the field
  rules.forEach(function (rule) {
    if (rule.el) {
      rule.el.addEventListener("input", function () {
        check(rule);
      });
    }
  });

  form.addEventListener("submit", function (event) {
    let isValid = true;
    rules.forEach(function (rule) {
      if (!check(rule)) isValid = false;
    });
    if (!isValid) {
      event.preventDefault();
    }
  });
});
