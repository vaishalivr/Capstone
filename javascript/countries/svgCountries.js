const svgCountries = d3.select("#svg-countries");
const square_proportion = 1000 / Math.sqrt(258671);
const countriesInfographic = Object.create(infographicContainer);
countriesInfographic.svg = svgCountries;
countriesInfographic.height = "800px";
countriesInfographic.render();

const svgContainerWidth = countriesInfographic.getDimensions().width;
const countryGridHeight = 750;

const numRows = 9;
const numCols = 9;
const rowSpacing = countryGridHeight / (numRows - 1);
const colSpacing = svgContainerWidth / (numCols - 1);
let countryIndex = 0;
let lastClickedRectId = null;

svgCountries
  .append("defs")
  .append("pattern")
  .attr("id", "hashPattern")
  .attr("width", 8)
  .attr("height", 8)
  .attr("patternUnits", "userSpaceOnUse")
  .append("path")
  .attr("d", "M 0,8 l 8,-8 M -2,2 l 4,-4 M 6,10 l 4,-4")
  .attr("stroke", "#ffd43c")
  .attr("stroke-width", 2);

var countriesLevelGauge = Object.create(levelGaugeWidget);
countriesLevelGauge.parentSvg = svgCountries;
countriesLevelGauge.render();
// {
//   Country: "United States",
//   Total: 258671,
//   Counts: { recognized: 231319, unrecognized: 27352 },
// }
countriesArray.forEach((country, countryIndex) => {
  const x = ((countryIndex % 8) + 0.5) * colSpacing;
  const y = (Math.floor(countryIndex / 8) + 0.5) * rowSpacing;

  let squareSize = Math.floor(
    Math.sqrt(countriesArray[countryIndex].Total) * square_proportion
  );

  const rectId = `rect-${countryIndex}`;

  svgCountries
    .append("rect")
    .attr("x", x - squareSize / 2)
    .attr("y", y - squareSize / 2)
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr("fill", "none")
    .attr("stroke", "#ffd43c")
    .attr("stroke-width", "6px")
    .attr("id", rectId)
    .style("opacity", 0);

  svgCountries
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", "12px")
    .attr("data-bg-rect", rectId)
    .text(countriesArray[countryIndex].Country)
    .style("cursor", "pointer")
    .on("click", function () {
      var bgRectId = d3.select(this).attr("data-bg-rect");
      const hashedLevel =
        countriesArray[countryIndex]["Counts"]["unrecognized"];
      if (lastClickedRectId) {
        d3.select(`#${lastClickedRectId}`).transition().style("opacity", 0);
      }
      d3.select(`#${bgRectId}`).transition().style("opacity", 1);
      lastClickedRectId = bgRectId;
      countriesLevelGauge.resize(
        { value: hashedLevel, label: "unrecognized" },
        {
          value: countriesArray[countryIndex]["Counts"]["recognized"],
          label: "recognized",
        }
      );

      svgCountries
        .select(".infographic-bg")
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-width", "6px")
        .attr("stroke", "#ffd43c")
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .attr("stroke-width", 0);
    });
});

const countriesPlayButton = new PlayButton(
  svgCountries,
  {
    containerWidth: countriesInfographic.getDimensions().width,
    containerHeight: countriesInfographic.getDimensions().height,
  },
  function (e) {
    svgCountries.selectAll("#animationPath").remove();
    svgCountries.selectAll(".animatedText").remove();
    svgCountries.selectAll(".curve").remove();

    const pathData = `M 0 0 H ${svgContainerWidth} V ${countryGridHeight} H 0 V 0`;
    const perimeter = 2 * (svgContainerWidth + countryGridHeight);

    const animationPath = svgCountries
      .append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "#ffd43c")
      .attr("stroke-width", 9)
      .attr("id", "animationPath")
      .attr("stroke-dasharray", perimeter)
      .attr("stroke-dashoffset", perimeter);

    animationPath
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", function () {
        d3.transition()
          .delay(1000)
          .on("start", function () {
            let text = svgCountries
              .append("text")
              .attr("class", "animatedText")
              .attr("x", 900)
              .attr("y", 90)
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "central")
              .attr("fill", "black")
              .style("font-family", "'Permanent Marker', cursive")
              .text("# of entries from US");

            const textX = 900;
            const textY = 70;
            const lineY = 0;

            const controlPointX1 = textX;
            const controlPointY1 = textY - 20;
            const controlPointX2 = textX;
            const controlPointY2 = lineY + (textY - lineY) / 2;

            let curve = svgCountries
              .append("path")
              .attr(
                "d",
                `M ${textX} ${textY}
                     C ${controlPointX1} ${controlPointY1},
                       ${controlPointX2} ${controlPointY2},
                       ${textX} ${lineY}`
              )
              .attr("stroke", "black")
              .attr("stroke-width", 1)
              .attr("fill", "none")
              .attr("class", "curve");

            setTimeout(() => {
              animationPath.remove();
              text.remove();
              curve.remove();
            }, 2500);

            setTimeout(() => {
              let rectId = "rect-17";
              d3.select(`#${rectId}`).transition().style("opacity", 1);
            }, 2000);

            setTimeout(() => {
              let text17 = svgCountries
                .append("text")
                .attr("class", "animatedText")
                .attr("x", 300)
                .attr("y", 280)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("fill", "black")
                .style("font-family", "'Permanent Marker', cursive")
                .text("# of entries from Netherlands compared to US");

              svgCountries
                .select(".infographic-bg")
                .transition()
                .attr("stroke-width", 5)
                .attr("stroke", "#ffd43c");

              setTimeout(() => {
                const rectId = "rect-17";
                text17.remove();
                d3.select(`#${rectId}`).transition().style("opacity", 0);
                svgCountries.select(".infographic-bg").attr("stroke-width", 0);
              }, 4000);
            }, 4000);

            setTimeout(() => {
              let rectId = "rect-46";
              d3.select(`#${rectId}`).transition().style("opacity", 1);
            }, 9000);

            setTimeout(() => {
              let text46 = svgCountries
                .append("text")
                .attr("class", "animatedText")
                .attr("x", 800)
                .attr("y", 520)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .attr("fill", "black")
                .style("font-family", "'Permanent Marker', cursive")
                .text("# of entries from Estonia compared to US");

              svgCountries
                .select(".infographic-bg")
                .transition()
                .attr("stroke-width", 5)
                .attr("stroke", "#ffd43c");

              setTimeout(() => {
                const rectId = "rect-46";
                text46.remove();
                d3.select(`#${rectId}`).transition().style("opacity", 0);
                svgCountries.select(".infographic-bg").attr("stroke-width", 0);
              }, 6000);
            }, 10000);
          });
      });
  }
);
