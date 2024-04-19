const svgSmallDifferences = d3.select("#smallDifferences");

var smallDifferencesInfographic = Object.create(infographicContainer);
smallDifferencesInfographic.svg = svgSmallDifferences;
smallDifferencesInfographic.height = "500px";
smallDifferencesInfographic.render();

const sentences = [
  {
    sentence: "seeing snow on some mornings",
    x: "50",
    y: "100",
    rotate: "-10",
    surprise_lvl: "0.75",
  },
  {
    sentence: "kids playing indoors after school",
    x: "620",
    y: "100",
    rotate: "10",
    surprise_lvl: "1.2",
    annotation: { text: "my surprise level", position: { x: 750, y: 75 } },
  },
  {
    sentence: "night sky at 4pm",
    x: "220",
    y: "150",
    rotate: "-5",
    surprise_lvl: "1",
  },
  {
    sentence: "freezing inspite of sun shining",
    x: "450",
    y: "200",
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
    x: "110",
    y: "250",
    rotate: "2",
    surprise_lvl: "0.3",
  },
  {
    sentence: "newspaper coming in a sleeve",
    x: "400",
    y: "340",
    rotate: "-5",
    surprise_lvl: "0.3",
  },
  {
    sentence: "different units of measurement",
    x: "600",
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
        d3.select(`#${target_id} > .annotation-group`)
          .transition()
          .duration(2500)
          .style("opacity", 1);
      } else {
        d3.select(`#${target_id} > rect`).attr("width", 0);
        d3.select(`#${target_id} > .annotation-group`).style("opacity", 0);
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
    .style("font-size", "1.8rem")
    .attr("x", sentences[i].x)
    .attr("y", sentences[i].y)
    .attr(
      "transform",
      `rotate(${sentences[i].rotate}, ${sentences[i].x}, ${sentences[i].y})`
    )
    .attr("data-surprise-lvl", sentences[i].surprise_lvl);
  if ("annotation" in sentences[i]) {
    var curve = d3.line().curve(d3.curveNatural);
    var curvePoints = [
      [
        sentences[i].annotation.position.x + 45,
        sentences[i].annotation.position.y + 15,
      ],
      [
        sentences[i].annotation.position.x + 40,
        sentences[i].annotation.position.y - 10,
      ],
      [
        sentences[i].annotation.position.x + 10,
        sentences[i].annotation.position.y - 20,
      ],
    ];
    var annotationGroup = sentenceGroup
      .append("g")
      .attr("class", "annotation-group");
    annotationGroup
      .append("g")
      .attr(
        "transform",
        `translate(${sentences[i].annotation.position.x - 100} ${
          sentences[i].annotation.position.y - 20
        })`
      )
      .append("text")
      .text(sentences[i].annotation.text);
    annotationGroup
      .append("g")
      .attr(
        "transform",
        `translate(${sentences[i].annotation.position.x - 140} ${
          sentences[i].annotation.position.y - 10
        })`
      )
      .append("text")
      .text("0%")
      .style("font-size", "1rem");
    annotationGroup
      .append("g")
      .attr(
        "transform",
        `translate(${sentences[i].annotation.position.x + 200} ${
          sentences[i].annotation.position.y + 50
        })`
      )
      .append("text")
      .text("100%")
      .style("font-size", "1rem");
    annotationGroup
      .append("path")
      .attr("d", curve(curvePoints))
      .attr("stroke-width", 2)
      .attr("fill", "none");
    annotationGroup
      .append("circle")
      .attr("cx", 795)
      .attr("cy", 90)
      .attr("r", 3);
  }
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
