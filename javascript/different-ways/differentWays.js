const svgDifferentWays = d3.select("#different-ways");
const svgDifferentWaysObj = { width: 1000, height: 450, strokeWidth: 3 };
const totalDuration = 2000;

svgDifferentWays
  .attr("width", svgDifferentWaysObj.width)
  .attr("height", svgDifferentWaysObj.height);

svgDifferentWays
  .append("rect")
  .attr("id", "recognized-rect")
  .attr("x", 0)
  .attr("y", svgDifferentWaysObj.height - 60)
  .attr("width", 0)
  .attr("height", svgDifferentWaysObj.height - 60)
  .attr("fill", "#ffd43c")
  .attr("stroke", "#ffd43c");

svgDifferentWays
  .append("rect")
  .attr("id", "outerRect")
  .attr("width", svgDifferentWaysObj.width)
  .attr("height", svgDifferentWaysObj.height)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", svgDifferentWaysObj.strokeWidth);

const words2 = ["line", "square", "triangle", "circle"];

const positions2 = [
  { x: svgDifferentWaysObj.width / 2 - 120, y: 50 },
  { x: svgDifferentWaysObj.width / 2, y: 50 },
  { x: svgDifferentWaysObj.width / 2 + 120, y: 50 },
  { x: svgDifferentWaysObj.width / 2 + 240, y: 50 },
];

const removePreviousDoodles = () => {
  svgDifferentWays.selectAll(".square-group").remove();
  svgDifferentWays.selectAll(".circle-group").remove();
  svgDifferentWays.selectAll(".line-group").remove();
  svgDifferentWays.selectAll(".triangle-group").remove();
};

const createPath = (stroke) => {
  let d = `M ${stroke[0][0]} ${stroke[1][0]}`;
  for (let i = 1; i < stroke[0].length; i++) {
    d += ` L ${stroke[0][i]} ${stroke[1][i]}`;
  }
  return d;
};

const createDoodleGroup = (groupClass, translateX, translateY, scaleFactor) => {
  return svgDifferentWays
    .append("g")
    .attr("class", groupClass)
    .attr(
      "transform",
      `translate(${translateX}, ${translateY}) scale(${scaleFactor})`
    );
};

const appendPathsToGroups = (group, lineData, createPath) => {
  return group
    .append("path")
    .attr("d", createPath(lineData[0]))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "2");
};

const drawLegendLine = () => {
  svgDifferentWays
    .append("line")
    .attr("x1", 0)
    .attr("y1", svgDifferentWaysObj.height - 60)
    .attr("x2", svgDifferentWaysObj.width)
    .attr("y2", svgDifferentWaysObj.height - 60)
    .attr("stroke", "black");
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

words2.forEach((word, index) => {
  svgDifferentWays
    .append("text")
    .attr("x", positions2[index].x)
    .attr("y", positions2[index].y)
    .attr("id", word)
    .text(word)
    .style("cursor", "pointer")
    .on("click", function () {
      if (word == "line") {
        removePreviousDoodles();
        drawLegendLine();
        resizeBar("#recognized-rect", 190, svgDifferentWaysObj.height);

        const group1 = createDoodleGroup("line-group", 100, 100, 0.5);
        const group2 = createDoodleGroup("line-group", 300, 100, 0.5);

        const path1 = appendPathsToGroups(group1, line1, createPath);
        const path2 = appendPathsToGroups(group2, line2, createPath);

        const length1 = path1.node().getTotalLength();
        const length2 = path2.node().getTotalLength();

        animatePathStroke(path1, length1);
        animatePathStroke(path2, length2);
      }

      if (word === "square") {
        removePreviousDoodles();
        drawLegendLine();
        resizeBar("#recognized-rect", 200, svgDifferentWaysObj.height);

        const group1 = createDoodleGroup("square-group", 100, 100, 0.5);
        const group2 = createDoodleGroup("square-group", 300, 100, 0.5);

        const path1 = appendPathsToGroups(group1, square1, createPath);
        const path2 = appendPathsToGroups(group2, square2, createPath);

        const length1 = path1.node().getTotalLength();
        const length2 = path2.node().getTotalLength();

        animatePathStroke(path1, length1);
        animatePathStroke(path2, length2);
      }

      if (word == "triangle") {
        console.log("triangle");
        removePreviousDoodles();
        drawLegendLine();
        resizeBar("#recognized-rect", 330, svgDifferentWaysObj.height);

        const group1 = createDoodleGroup("triangle-group", 100, 100, 0.5);
        const group2 = createDoodleGroup("triangle-group", 300, 100, 0.5);

        const path1 = appendPathsToGroups(group1, triangle1, createPath);
        const path2 = appendPathsToGroups(group2, triangle2, createPath);

        const length1 = path1.node().getTotalLength();
        const length2 = path2.node().getTotalLength();

        animatePathStroke(path1, length1);
        animatePathStroke(path2, length2);
      }

      if (word == "circle") {
        removePreviousDoodles();
        drawLegendLine();
        resizeBar("#recognized-rect", 390, svgDifferentWaysObj.height);

        const group1 = createDoodleGroup("circle-group", 270, 150, 0.5);
        const group2 = createDoodleGroup("circle-group", 600, 150, 0.5);

        [group1, group2].forEach((group) => {
          group
            //.selectAll("circle") // Select all circles within the group
            .on("mouseover", () => console.log("hello")); // Log 'hello' on mouseover
        });

        const path1 = appendPathsToGroups(group1, circle1, createPath);
        const path2 = appendPathsToGroups(group2, circle2, createPath);

        const length1 = path1.node().getTotalLength();
        const length2 = path2.node().getTotalLength();

        animatePathStroke(path1, length1);
        animatePathStroke(path2, length2);
      }
    });
});
