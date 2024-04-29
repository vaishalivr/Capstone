let mainfooterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
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
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.getAttribute("id") == "section0") {
          if (entry.boundingClientRect.top == entry.intersectionRect.top) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0);
          }
          if (
            entry.boundingClientRect.bottom == entry.intersectionRect.bottom
          ) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0.25);
          }
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 0");
          document
            .querySelector(".inner-sticky-text")
            .setAttribute("style", "width: 0%");
        }
        if (entry.target.getAttribute("id") == "section1") {
          if (entry.boundingClientRect.top == entry.intersectionRect.top) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0.375);
            document
              .querySelector(".inner-sticky-text")
              .setAttribute("style", "width: 0%");
          }
          if (
            entry.boundingClientRect.bottom == entry.intersectionRect.bottom
          ) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0.5);
            document
              .querySelector(".inner-sticky-text")
              .setAttribute("style", "width: 100%");
          }
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 1");
        }
        if (entry.target.getAttribute("id") == "section2") {
          if (entry.boundingClientRect.top == entry.intersectionRect.top) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0.625);
            document
              .querySelector(".inner-sticky-text")
              .setAttribute("style", "width: 100%");
          }
          if (
            entry.boundingClientRect.bottom == entry.intersectionRect.bottom
          ) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 0.75);
            document
              .querySelector(".inner-sticky-text")
              .setAttribute("style", "width: 100%");
          }
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 1");
        }
        if (entry.target.getAttribute("id") == "section3") {
          console.log(entry);
          if (entry.boundingClientRect.top == entry.intersectionRect.top) {
            document
              .querySelector("#footer-brush-clip-rect")
              .setAttribute("height", 1);
          }
          document
            .querySelector(".background-text-flex")
            .setAttribute("style", "opacity: 1");
          // document
          //   .querySelector(".inner-sticky-text")
          //   .setAttribute("style", "width: 100%");
        }
      }
    });
  },
  {
    root: document.querySelector(".footer"),
    threshold: [0.25, 0.5],
  }
);

inFooterObserver.observe(document.querySelector("#section0"));
inFooterObserver.observe(document.querySelector("#section1"));
inFooterObserver.observe(document.querySelector("#section2"));
inFooterObserver.observe(document.querySelector("#section3"));
