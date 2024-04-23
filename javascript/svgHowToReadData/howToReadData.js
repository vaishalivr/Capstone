var svgHowToReadData = d3.select("#howToReadData");

const howToReadInfographic = Object.create(infographicContainer);
howToReadInfographic.svg = svgHowToReadData;
howToReadInfographic.height = "450px";
howToReadInfographic.render();

// const playButton = new PlayButton(
//   svgHowToReadData,
//   {
//     containerWidth: howToReadInfographic.getDimensions().width,
//     containerHeight: howToReadInfographic.getDimensions().height,
//   },

// );

const startXTextPosition = 460;
const startYTextPosition = 220;
const endXTextPosition = 460;
const endYTextPosition = 280;
const yOffset = 30;

var staticGroup = svgHowToReadData
  .append("g")
  .attr("transform", `translate(240,0)`);

var animatedGroup = svgHowToReadData
  .append("g")
  .attr("transform", `translate(240,0)`);

const sampleData = {
  word: "house",
  countrycode: "US",
  timestamp: "2017-03-11 19:09:26.08877 UTC",
  recognized: true,
  key_id: "5054419760578560",
  drawing: [
    [
      [9, 9, 13, 19, 23, 41, 62, 129, 145, 164, 166, 161, 141, 132, 0],
      [
        108, 212, 239, 252, 255, 255, 253, 236, 231, 220, 189, 164, 100, 85,
        108,
      ],
    ],
    [
      [3, 3, 14, 44, 63, 75, 100, 135],
      [107, 92, 68, 22, 1, 0, 16, 72],
    ],
    [
      [27, 22, 25, 37, 60, 65, 63, 22],
      [157, 162, 203, 210, 210, 203, 148, 148],
    ],
    [
      [13, 49, 74],
      [185, 187, 184],
    ],
    [
      [38, 42],
      [156, 212],
    ],
  ],
};

const drawStaticHouse = () => {
  sampleData.drawing.forEach((stroke) => {
    let pathData = "M" + stroke[0][0] + "," + (stroke[1][0] + yOffset);
    for (let i = 1; i < stroke[0].length; i++) {
      pathData += " L" + stroke[0][i] + "," + (stroke[1][i] + yOffset);
    }

    staticGroup
      .append("path")
      .attr("d", pathData)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("opacity", "0.15");
  });
};

drawStaticHouse();

staticGroup
  .append("text")
  .attr("x", startXTextPosition - 100)
  .attr("y", startYTextPosition)
  .text("Start Point")
  .attr("font-size", "18px");

animatedGroup
  .append("text")
  .attr("id", "howToRead-startPosition-hint")
  .attr("x", startXTextPosition)
  .attr("y", startYTextPosition)
  .attr("font-size", "18px")
  .attr("opacity", 0);

staticGroup
  .append("text")
  .attr("x", startXTextPosition - 100)
  .attr("y", endYTextPosition)
  .text("End Point")
  .attr("font-size", "18px");

animatedGroup
  .append("text")
  .attr("id", "howToRead-endPosition-hint")
  .attr("x", startXTextPosition)
  .attr("y", endYTextPosition)
  .attr("font-size", "18px")
  .attr("opacity", 0);

const animateHowToReadData = function (e) {
  d3.selectAll(".house-drawing-bold-path").remove();
  d3.selectAll(".code-highlighter").attr("class", null);
  d3.select("#howToReadDataToolbar").style("opacity", 0);

  let delay = 75;
  const segmentDuration = 1000;
  const pauseDuration = 10;

  sampleData.drawing.forEach((stroke, strokeIndex) => {
    d3.select(`#sample-drawing-stroke-${strokeIndex}`)
      .transition()
      .delay(delay)
      .attr("class", "code-highlighter");
    stroke[0].forEach((_, index) => {
      if (index < stroke[0].length - 1) {
        var startPoint = [stroke[0][index], stroke[1][index] + yOffset];
        var endPoint = [stroke[0][index + 1], stroke[1][index + 1] + yOffset];

        var line = d3
          .line()
          .x(function (d) {
            return d[0];
          })
          .y(function (d) {
            return d[1];
          });

        animatedGroup
          .append("path")
          .attr("class", "house-drawing-bold-path")
          .attr(
            "data-start-position",
            `(${startPoint[0]}, ${startPoint[1] - yOffset})`
          )
          .attr(
            "data-end-position",
            `(${endPoint[0]}, ${endPoint[1] - yOffset})`
          )
          .attr("d", line([startPoint, endPoint]))
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("fill", "none")
          .attr("stroke-linecap", "round")
          .attr("stroke-dasharray", 1000)
          .attr("stroke-dashoffset", 1000)
          .transition()
          .delay(delay)
          .duration(segmentDuration)
          .attr("stroke-dashoffset", 0)
          .on("start", function () {
            d3.select("#howToRead-startPosition-hint")
              .text(d3.select(this).attr("data-start-position"))
              .attr("opacity", 1);
            d3.select("#howToRead-endPosition-hint")
              .text(d3.select(this).attr("data-end-position"))
              .attr("opacity", 1);
          })
          .on("end", function (e) {
            d3.select("#howToRead-startPosition-hint")
              .transition()
              .delay(delay)
              .attr("opacity", 0);
            d3.select("#howToRead-endPosition-hint")
              .transition()
              .delay(delay)
              .attr("opacity", 0);
          });
        delay += segmentDuration + pauseDuration;
      }
    });
    d3.select(`#sample-drawing-stroke-${strokeIndex}`)
      .transition()
      .delay(delay)
      .attr("class", null);
  });
  d3.select("#howToReadDataToolbar")
    .transition()
    .delay(delay)
    .style("opacity", 1);
};
d3.select("#howto-infographic-container-play").on(
  "click",
  animateHowToReadData
);

const howToReadDataPlayButton = new PlayButton(
  svgHowToReadData,
  {
    containerWidth: howToReadInfographic.getDimensions().width,
    containerHeight: howToReadInfographic.getDimensions().height,
  },
  animateHowToReadData
);
