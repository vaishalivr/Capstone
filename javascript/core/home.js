const inParagraphTextHighlightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        return;
      } else {
        e.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 1 }
);

inParagraphTextHighlightObserver.observe(
  document.getElementById("p-highlight-1")
);
inParagraphTextHighlightObserver.observe(
  document.getElementById("p-highlight-2")
);
inParagraphTextHighlightObserver.observe(
  document.getElementById("p-highlight-3")
);
