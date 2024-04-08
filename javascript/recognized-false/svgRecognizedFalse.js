const svgRecognizedFalse = d3.select("#recognized-false");
const svgRecognizedFalseObj = { width: 1000, height: 800, strokeWidth: 3 };

svgRecognizedFalse
  .attr("width", svgRecognizedFalseObj.width)
  .attr("height", svgRecognizedFalseObj.height);

svgRecognizedFalse
  .append("rect")
  .attr("id", "unrecognized-rect")
  .attr("x", 0)
  .attr("y", svgRecognizedFalseObj.height - 60)
  .attr("width", 0)
  .attr("height", svgRecognizedFalseObj.height - 60)
  .attr("fill", "url(#hashPattern)")
  .attr("stroke", "#ffd43c");

svgRecognizedFalse
  .append("rect")
  .attr("id", "outerRect1")
  .attr("width", svgRecognizedFalseObj.width)
  .attr("height", svgRecognizedFalseObj.height)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", svgRecognizedFalseObj.strokeWidth);

const words1 = ["House", "Dishwasher", "Fans", "Blackberry"];

const positions1 = [
  { x: svgRecognizedTrueObj.width / 2 - 120, y: 50 },
  { x: svgRecognizedTrueObj.width / 2 - 30, y: 50 },
  { x: svgRecognizedTrueObj.width / 2 + 120, y: 50 },
  { x: svgRecognizedTrueObj.width / 2 + 240, y: 50 },
];

const legendLine = svgRecognizedFalse
  .append("line")
  .attr("x1", 200)
  .attr("y1", 690)
  .attr("x2", 800) // why??
  .attr("y2", 690)
  .attr("stroke", "#ffd43c")
  .attr("stroke-width", 6)
  .attr("id", "legend-line");

legendLine.attr("opacity", 0);

const groupAnnotationText = svgRecognizedFalse
  .append("text")
  .text("")
  .attr("x", 500)
  .attr("y", 720);

groupAnnotationText.attr("opacity", 0);

const appendRectsWithImagesAndText = (numRects, imagePaths, textArray) => {
  svgRecognizedFalse.selectAll("g.row-group").remove();

  const rectsPerRow = 6;
  const padding = 10;
  const rectSize = 90;
  const verticalSpacing = 150;

  const totalWidth = rectsPerRow * rectSize + (rectsPerRow - 1) * padding;

  const startXOffset = (svgRecognizedFalseObj.width - totalWidth) / 2;
  const startYOffset = 120;
  const numRows = Math.ceil(numRects / rectsPerRow);

  for (let row = 0; row < numRows; row++) {
    const yRowStart = startYOffset + row * verticalSpacing;

    const rowGroup = svgRecognizedFalse
      .append("g")
      .attr("class", "row-group")
      .on("mouseover", function () {
        legendLine.style("opacity", 1);
        groupAnnotationText.style("opacity", 1).text(textArray[row]);
        // d3.select(this).select("rect.encompassing").style("opacity", 1);
      })
      .on("mouseout", function () {
        legendLine.style("opacity", 0);
        groupAnnotationText.style("opacity", 0).text("");
        // d3.select(this).select("rect.encompassing").style("opacity", 0);
      });

    for (let col = 0; col < rectsPerRow; col++) {
      const x = startXOffset + col * (rectSize + padding);

      rowGroup
        .append("rect")
        .attr("x", x)
        .attr("y", yRowStart)
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "white")
        .attr("stroke", "black");

      if (row * rectsPerRow + col < imagePaths.length) {
        rowGroup
          .append("image")
          .attr("href", imagePaths[row * rectsPerRow + col])
          .attr("x", x)
          .attr("y", yRowStart)
          .attr("width", rectSize)
          .attr("height", rectSize)
          .attr("preserveAspectRatio", "xMidYMid meet");
      }
    }

    attachHoverEffectToGroup(rowGroup, {});
  }
};

// const resizeUnrecognizedBar = (width) => {
//   d3.select("#unrecognized-rect")
//     .transition()
//     .duration(750)
//     .attr("x", 0)
//     .attr("y", svgRecognizedFalseObj.height - 60)
//     .attr("height", svgRecognizedFalseObj.height - 60)
//     .attr("width", width);
// };

const drawBarChartLine = () => {
  svgRecognizedFalse
    .append("line")
    .attr("x1", 0)
    .attr("y1", svgRecognizedFalseObj.height - 60)
    .attr("x2", svgRecognizedFalseObj.width)
    .attr("y2", svgRecognizedFalseObj.height - 60)
    .attr("stroke", "black");
};

words1.forEach((word, index) => {
  var wordTab = Object.create(svgTab);
  wordTab.title = word;
  wordTab.parentSvg = svgRecognizedFalse;
  wordTab.totalCount = words1.length;
  wordTab.index = index;
  wordTab.clickCallback = function (e) {
    // d3.selectAll("line:not(#legend-line):not(#lineAboveBar)").remove();
    d3.selectAll("g").remove();

    if (e.target.id == "Dishwasher") {
      resizeBar("#unrecognized-rect", 130, svgRecognizedFalseObj.height);
      drawBarChartLine();
      appendRectsWithImagesAndText(24, imagePathDishwasher, [
        "Counter top Dishwashers",
        "Tap Shower",
        "Person Washing Dishes",
        "Sink",
      ]);
    }
    if (e.target.id == "Fans") {
      resizeBar("#unrecognized-rect", 161, svgRecognizedFalseObj.height);
      drawBarChartLine();
      appendRectsWithImagesAndText(24, imagePathFan, [
        "Hand Fan",
        "Pedestal Fan",
        "Taylor Swift Fan",
        "Exhause Fan",
      ]);
    }
    if (e.target.id == "House") {
      resizeBar("#unrecognized-rect", 22.42, svgRecognizedFalseObj.height);
      drawBarChartLine();
      appendRectsWithImagesAndText(12, imagePathHouse, [
        "Flat Roofed",
        "Houses with Scene",
      ]);
    }
    if (e.target.id == "Blackberry") {
      resizeBar("#unrecognized-rect", 113, svgRecognizedFalseObj.height);
      drawBarChartLine();
      appendRectsWithImagesAndText(12, imagePathBlackberry, ["Fruit", "Phone"]);
    }
  };
  wordTab.render();
});
