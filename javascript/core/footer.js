let mainfooterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        d3.select(".foreground").style("display", "block");
        d3.select("#callToActionFooterText").attr(
          "class",
          "background-text-flex"
        );
      } else {
        d3.select(".foreground").style("display", "none");
        d3.select("#callToActionFooterText").attr("class", "background-text");
      }
    });
  },
  { threshold: 0.95 }
);
mainfooterObserver.observe(
  document.querySelector("#callToActionFooterBackground")
);
let inFooterObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.getAttribute("id") == "section0") {
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 0");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 0px");
        }
        if (entry.target.getAttribute("id") == "section1") {
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 0.33");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 33%");
        }
        if (entry.target.getAttribute("id") == "section2") {
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 0.66");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 66%");
        }
        if (entry.target.getAttribute("id") == "section3") {
          document
            .querySelector(".background-text-flex")
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

inFooterObserver.observe(document.querySelector("#section0"));
inFooterObserver.observe(document.querySelector("#section1"));
inFooterObserver.observe(document.querySelector("#section2"));
inFooterObserver.observe(document.querySelector("#section3"));
