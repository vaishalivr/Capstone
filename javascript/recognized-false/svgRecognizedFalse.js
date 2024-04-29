const svgRecognizedFalse = d3.select("#recognized-false");
const svgRecognizedFalseObj = { width: 1000, height: 800, strokeWidth: 3 };

// Inforgraphic Container
var recognizedFalseInfographic = Object.create(infographicContainer);
recognizedFalseInfographic.svg = svgRecognizedFalse;
recognizedFalseInfographic.height = "750px";
recognizedFalseInfographic.render();

// Level Gauge
var svgRecognizedFalseGauge = Object.create(levelGaugeWidget);
svgRecognizedFalseGauge.parentSvg = svgRecognizedFalse;
svgRecognizedFalseGauge.parentSvgHeight = parseInt(
  svgRecognizedFalse.attr("height")
);
svgRecognizedFalseGauge.render();

// Fixed Tooltip
var categoryTooltip = new FixedTooltip(svgRecognizedFalse, {
  position: {
    x: recognizedFalseInfographic.getDimensions().width * 0.2,
    y: recognizedFalseInfographic.getDimensions().height - 100,
  },
  size: recognizedFalseInfographic.getDimensions().width * 0.6,
});

const words1 = ["Blackberry", "Dishwasher", "Fans", "House"];

const appendRectsWithImagesAndText = (numRects, imagePaths, textArray) => {
  recognizedFalseInfographic.resetGraphic();

  const rectsPerRow = 6;
  const padding = 10;
  const rectSize = 90;
  const verticalSpacing = 120;

  const numRows = Math.ceil(numRects / rectsPerRow);

  for (let row = 0; row < numRows; row++) {
    const yRowStart = row * verticalSpacing;

    const rowGroup = d3
      .create("svg:g")
      .attr("class", "row-group")
      .on("mouseover", function () {
        categoryTooltip.showWithText(textArray[row]);
      })
      .on("mouseout", function () {
        categoryTooltip.hide();
      });

    for (let col = 0; col < rectsPerRow; col++) {
      const x = col * (rectSize + padding);

      rowGroup
        .append("rect")
        .attr("x", x)
        .attr("y", yRowStart)
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "none")
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
    recognizedFalseInfographic.addGraphicComponent(rowGroup);
    attachHoverEffectToGroup(rowGroup, {});
    recognizedFalseInfographic.alignGraphicStage();
  }
};

var defaultStart = true;

words1.forEach((word, index) => {
  var wordTab = Object.create(svgTab);
  wordTab.title = word;
  wordTab.parentSvg = svgRecognizedFalse;
  wordTab.totalCount = words1.length;
  wordTab.index = index;
  wordTab.clickCallback = function (e) {
    svgRecognizedFalse.selectAll("g.row-group").remove();

    if (e.target.id == "Dishwasher") {
      svgRecognizedFalseGauge.resize(
        { value: 21945, label: "unrecognized" },
        { value: 147814, label: "recognized" }
      );
      appendRectsWithImagesAndText(24, imagePathDishwasher, [
        "Counter top Dishwashers",
        "Tap Shower",
        "Person Washing Dishes",
        "Washing Dishes in Sink",
      ]);
    }
    if (e.target.id == "Fans") {
      svgRecognizedFalseGauge.resize(
        { value: 21964, label: "unrecognized" },
        { value: 114194, label: "recognized" }
      );
      appendRectsWithImagesAndText(24, imagePathFan, [
        "Hand Fan",
        "Pedestal Fan",
        "Taylor Swift Fan",
        "Exhaust Fan",
      ]);
    }
    if (e.target.id == "House") {
      svgRecognizedFalseGauge.resize(
        { value: 3037, label: "unrecognized" },
        { value: 132383, label: "recognized" }
      );
      appendRectsWithImagesAndText(18, imagePathHouse, [
        "Flat Roofed Houses",
        "Houses with Scene",
        "Horses as House",
      ]);
    }
    if (e.target.id == "Blackberry") {
      svgRecognizedFalseGauge.resize(
        { value: 14417, label: "unrecognized" },
        { value: 113736, label: "recognized" }
      );
      appendRectsWithImagesAndText(12, imagePathBlackberry, [
        "Blackberry Fruit",
        "Blackberry Phone",
      ]);
    }
  };
  wordTab.render();
  if (defaultStart) {
    wordTab.dispatchClick();
    defaultStart = false;
  }
});
