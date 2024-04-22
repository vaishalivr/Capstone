let observer = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.getAttribute("id") == "section0") {
          document
            .querySelector(".background-text")
            .setAttribute("style", "opacity: 0");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 0px");
        }
        if (entry.target.getAttribute("id") == "section1") {
          document
            .querySelector(".background-text")
            .setAttribute("style", "opacity: 0.33");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 33%");
        }
        if (entry.target.getAttribute("id") == "section2") {
          document
            .querySelector(".background-text")
            .setAttribute("style", "opacity: 0.66");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 66%");
        }
        if (entry.target.getAttribute("id") == "section3") {
          document
            .querySelector(".background-text")
            .setAttribute("style", "opacity: 0.99");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 100%");
        }
      }
    });
  },
  { root: document.querySelector(".footer"), threshold: 0.5 }
);

observer.observe(document.querySelector("#section0"));
observer.observe(document.querySelector("#section1"));
observer.observe(document.querySelector("#section2"));
observer.observe(document.querySelector("#section3"));
