const svgDifferentWays = d3.select("#different-ways");
const svgDifferentWaysObj = capstoneGlobals.svgStyle;
const totalDuration = 2000;
const tabRowPadding = 100;

const differentWaysInfographic = Object.create(infographicContainer);
differentWaysInfographic.svg = svgDifferentWays;
differentWaysInfographic.render();

var differentWaysLevelGauge = Object.create(levelGaugeWidget);
differentWaysLevelGauge.parentSvg = svgDifferentWays;
differentWaysLevelGauge.render();

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

const createDoodleGroup = (groupId, groupClass) => {
  return d3.create("svg:g").attr("class", groupClass).attr("id", groupId);
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

const legendLine1 = svgRecognizedFalse
  .append("line")
  .attr("x1", 200)
  .attr("y1", 690)
  .attr("x2", 800) // why??
  .attr("y2", 690)
  .attr("stroke", "#ffd43c")
  .attr("stroke-width", 6)
  .attr("id", "legend-line");

legendLine1.attr("opacity", 0);

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
      var group = createDoodleGroup(drawing["vectorId"], word + "-group");
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
