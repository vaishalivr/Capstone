const svgDifferentWays = d3.select("#different-ways");
const totalDuration = 2000;
const tabRowPadding = 100;

const differentWaysInfographic = Object.create(infographicContainer);
differentWaysInfographic.svg = svgDifferentWays;
differentWaysInfographic.height = "450px";
differentWaysInfographic.render();

var differentWaysLevelGauge = Object.create(levelGaugeWidget);
differentWaysLevelGauge.parentSvg = svgDifferentWays;
differentWaysLevelGauge.render();

const basicShapeTooltip = new FixedTooltip(svgDifferentWays, {
  position: {
    x: differentWaysInfographic.getDimensions().width * 0.2,
    y: differentWaysInfographic.getDimensions().height - 100,
  },
  size: differentWaysInfographic.getDimensions().width * 0.6,
});

const resetSvg = () => {
  Object.keys(shapeDrawings).forEach((word, index) => {
    svgDifferentWays.selectAll(`.${word}-group`).remove();
  });
};

const removePreviousDoodles = () => {
  Object.keys(shapeDrawings).forEach((word, index) => {
    svgDifferentWays.selectAll(`.${word}-group`).remove();
  });
};

const createDoodleGroup = (groupId, groupClass, doodleHelpText) => {
  return d3
    .create("svg:g")
    .attr("class", groupClass)
    .attr("id", groupId)
    .on("mouseover", function () {
      basicShapeTooltip.showWithText(doodleHelpText);
    })
    .on("mouseout", function () {
      basicShapeTooltip.hide();
    });
};

const appendPathsToGroups = (group, lineData, createPath) => {
  return group
    .append("path")
    .attr("d", createPath(lineData[0]))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2");
};

const animatePathStroke = (path, length) => {
  return path
    .attr("stroke-dasharray", length + " " + length)
    .attr("stroke-dashoffset", length)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
};

var defaultStart = true;
Object.keys(shapeDrawings).forEach((word, index) => {
  var wordTab = Object.create(svgTab);
  wordTab.title = word;
  wordTab.parentSvg = svgDifferentWays;
  wordTab.totalCount = Object.keys(shapeDrawings).length;
  wordTab.index = index;
  wordTab.clickCallback = () => {
    differentWaysInfographic.resetGraphic();

    differentWaysLevelGauge.resize(
      {
        value: shapeDrawings[word]["unrecognizedDrawingCount"],
        label: "unrecognized",
      },
      {
        value: shapeDrawings[word]["recognizedDrawingCount"],
        label: "recognized",
      }
    );

    shapeDrawings[word]["drawings"].forEach((drawing, index) => {
      var percentage =
        (drawing["totalCount"] * 100) /
        (shapeDrawings[word]["recognizedDrawingCount"] +
          shapeDrawings[word]["unrecognizedDrawingCount"]);
      var group = createDoodleGroup(
        drawing["vectorId"],
        word + "-group",
        drawing["totalCount"] +
          ` (${percentage.toFixed(2)}% of total drawings for ${word})`
      );
      var path = appendPathsToGroups(group, drawing["strokes"], createPath);
      differentWaysInfographic.addGraphicComponent(group);
      animatePathStroke(path, path.node().getTotalLength());
      attachHoverEffectToGroup(group, {});
      scaleGroupToGridCell(group, index * 200, 0);
    });
    differentWaysInfographic.alignGraphicStage();
  };
  wordTab.render();
  if (defaultStart) {
    wordTab.dispatchClick();
    defaultStart = false;
  }
});
