const svgSmallDifferences = d3.select("#smallDifferences");

var smallDifferencesInfographic = Object.create(infographicContainer);
smallDifferencesInfographic.svg = svgSmallDifferences;
smallDifferencesInfographic.height = "500px";
smallDifferencesInfographic.render();

const sentences = [
  {
    sentence: "seeing snow on some mornings",
    x: "50",
    y: "150",
    rotate: "-10",
    surprise_lvl: "0.75",
  },
  {
    sentence: "kids playing indoors after school",
    x: "420",
    y: "150",
    rotate: "10",
    surprise_lvl: "1.2",
  },
  {
    sentence: "night sky at 4pm",
    x: "220",
    y: "210",
    rotate: "-5",
    surprise_lvl: "1",
  },
  {
    sentence: "freezing inspite of sun shining",
    x: "370",
    y: "250",
    rotate: "3",
    surprise_lvl: "1.2",
  },
  {
    sentence: "clothes dryer in every house",
    x: "80",
    y: "400",
    rotate: "-3",
    surprise_lvl: "0.3",
  },
  {
    sentence: "wooden floored bathrooms",
    x: "90",
    y: "280",
    rotate: "2",
    surprise_lvl: "0.3",
  },
  {
    sentence: "newspaper coming in a sleve",
    x: "300",
    y: "340",
    rotate: "-5",
    surprise_lvl: "0.3",
  },
  {
    sentence: "different units of measurement",
    x: "400",
    y: "420",
    rotate: "-3",
    surprise_lvl: "0.3",
  },
];

const smallDiffObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      var target_id = d3.select(entry.target).attr("id");
      if (entry.isIntersecting) {
        d3.select(`#${target_id} > rect`)
          .transition()
          .duration(2500)
          .attr(
            "width",
            d3.select(`#${target_id} > text`).node().getBBox().width *
              parseFloat(
                d3.select(`#${target_id} > text`).attr("data-surprise-lvl")
              )
          );
      } else {
        d3.select(`#${target_id} > rect`).attr("width", 0);
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.75,
  }
);

for (let i = 0; i < sentences.length; i++) {
  var sentenceGroup = svgSmallDifferences
    .append("g")
    .attr("id", `sentenceGroup${i}`);
  let textElement = sentenceGroup
    .append("text")
    .text(sentences[i].sentence)
    .attr("font-family", "'Just Me Again Down Here', cursive")
    .attr("font-size", "1.8rem")
    .attr("x", sentences[i].x)
    .attr("y", sentences[i].y)
    .attr(
      "transform",
      `rotate(${sentences[i].rotate}, ${sentences[i].x}, ${sentences[i].y})`
    )
    .attr("data-surprise-lvl", sentences[i].surprise_lvl);
  let bbox = textElement.node().getBBox();
  sentenceGroup
    .insert("rect", ":first-child")
    .attr("x", bbox.x)
    .attr("y", bbox.y)
    .attr(
      "transform",
      `rotate(${sentences[i].rotate}, ${sentences[i].x}, ${sentences[i].y})`
    )
    .attr("fill", "#ffd43c")
    .attr("height", bbox.height);
  smallDiffObserver.observe(sentenceGroup.node());
}
