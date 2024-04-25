const svgCountries = d3.select("#svg-countries");
const square_proportion = 1000 / Math.sqrt(baseDataPoint.Total);
const countriesInfographic = Object.create(infographicContainer);
countriesInfographic.svg = svgCountries;
countriesInfographic.height = "800px";
countriesInfographic.render();

const svgContainerWidth = countriesInfographic.getDimensions().width;
const countryGridHeight = 740;

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

svgCountries
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", countriesInfographic.getDimensions().width)
  .attr("height", countryGridHeight)
  .attr("id", "country-us-size-rect")
  .attr("fill", "none")
  .attr("stroke", "#ffd43c")
  .attr("stroke-width", 6);

var countriesLevelGauge = Object.create(levelGaugeWidget);
countriesLevelGauge.parentSvg = svgCountries;
countriesLevelGauge.render();

countriesLevelGauge.resize(
  { value: baseDataPoint.Counts.unrecognized, label: "unrecognized" },
  { value: baseDataPoint.Counts.recognized, label: "recognized" }
);

countriesArray.forEach((country, countryIndex) => {
  if ("skipDrawing" in country && country.skipDrawing) {
    return;
  }
  const x = ((countryIndex % 8) + 0.5) * colSpacing;
  const y = (Math.floor(countryIndex / 8) + 0.5) * rowSpacing;

  let squareSize = Math.floor(
    Math.sqrt(countriesArray[countryIndex].Total) * square_proportion
  );

  const rectId = `rect-${countryIndex}`;

  var dataPointRect = svgCountries
    .append("rect")
    .attr("x", x - squareSize / 2)
    .attr("y", y - squareSize / 2)
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr("fill", "none")
    .attr("stroke", "#ffd43c")
    .attr("stroke-width", "6px")
    .attr("id", rectId)
    .attr("opacity", 0);

  var dataPointText = svgCountries
    .append("text")
    .attr("id", `data-point-text-${countryIndex}`)
    .attr("class", "country-data-point-text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", "12px")
    .attr("data-bg-rect", rectId)
    .text(country.Country)
    .style("cursor", "pointer")
    .on("click", function () {
      d3.selectAll(".country-data-point-text").attr("opacity", 0.25);
      d3.select(this).attr("opacity", 1);
      var bgRectId = d3.select(this).attr("data-bg-rect");
      const hashedLevel = country["Counts"]["unrecognized"];
      if (lastClickedRectId) {
        d3.select(`#${lastClickedRectId}`).transition().attr("opacity", 0);
      }
      d3.select(`#${bgRectId}`).transition().attr("opacity", 1);
      lastClickedRectId = bgRectId;
      countriesLevelGauge.resize(
        { value: hashedLevel, label: "unrecognized" },
        {
          value: country["Counts"]["recognized"],
          label: "recognized",
        }
      );

      d3.select("#country-us-size-rect")
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-width", 6)
        .attr("stroke", "#ffd43c")
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .attr("stroke-width", 0);
    });

  if ("helpText" in country) {
    var dataPointHelpText = svgCountries
      .append("text")
      .attr("id", `data-point-help-text-${countryIndex}`)
      .attr("class", "animatedText")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "#000")
      .attr("font-family", "Just Me Again Down Here")
      .style("font-size", "1.5rem")
      .text(country.helpText)
      .attr("opacity", 0);

    dataPointHelpText.attr(
      "x",
      parseInt(dataPointRect.attr("x")) +
        (dataPointHelpText.node().getComputedTextLength() -
          parseInt(dataPointRect.attr("width"))) /
          2
    );

    dataPointHelpText.attr(
      "y",
      parseInt(dataPointRect.attr("y")) +
        parseInt(dataPointRect.attr("height")) +
        20
    );
  }
});

const animateInfographic = function (e) {
  svgCountries.selectAll("#animationPath").remove();
  svgCountries.selectAll(".animatedText").attr("opacity", 0);
  svgCountries.selectAll(".curve").remove();
  d3.select("#country-us-size-rect").attr("stroke-width", 0);
  d3.select("#svg-countries-toolbar").style("opacity", 0);

  countriesLevelGauge.reset();

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
      countriesLevelGauge.resize(
        { value: baseDataPoint.Counts.unrecognized, label: "unrecognized" },
        { value: baseDataPoint.Counts.recognized, label: "recognized" }
      );
      d3.transition()
        .delay(1000)
        .on("start", function () {
          let text = svgCountries
            .append("text")
            .attr("class", "animatedText")
            .attr("x", 900)
            .attr("y", 80)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "#000")
            .attr("font-family", "Just Me Again Down Here")
            .style("font-size", "1.5rem")
            .text("entries from US");

          var curve = d3.line().curve(d3.curveNatural);
          var curvePoints = [
            [960, 90],
            [965, 105],
            [990, 110],
          ];

          let curvePointer = svgCountries
            .append("path")
            .attr("d", curve(curvePoints))
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("stroke", "#aaa");

          setTimeout(() => {
            animationPath.remove();
            text.remove();
            curvePointer.remove();
          }, 2500);

          setTimeout(() => {
            d3.select("#data-point-text-17").dispatch("click");
            d3.select("#data-point-help-text-17").attr("opacity", 1);
          }, 2500);

          setTimeout(() => {
            d3.select("#data-point-help-text-17").attr("opacity", 0);
            d3.select(`#rect-17`).transition().attr("opacity", 0);
          }, 6000);

          setTimeout(() => {
            d3.select("#data-point-text-46").dispatch("click");
            d3.select("#data-point-help-text-46").attr("opacity", 1);
          }, 6000);

          setTimeout(() => {
            d3.select("#data-point-help-text-46").attr("opacity", 0);
            d3.select(`#rect-46`).transition().attr("opacity", 0);
            countriesLevelGauge.reset();
            d3.selectAll(".country-data-point-text").attr("opacity", 1);
            d3.select("#svg-countries-toolbar").style("opacity", 1);
          }, 10000);
        });
    });
};

const countriesPlayButton = new PlayButton(
  svgCountries,
  {
    containerWidth: countriesInfographic.getDimensions().width,
    containerHeight: countriesInfographic.getDimensions().height,
  },
  animateInfographic
);

d3.select("#country-infographic-container-play").on(
  "click",
  animateInfographic
);

d3.select("#country-infographic-container-reset").on("click", function (e) {
  svgCountries.selectAll("#animationPath").remove();
  svgCountries.selectAll(".animatedText").attr("opacity", 0);
  svgCountries.selectAll(".curve").remove();
  d3.select("#country-us-size-rect").attr("stroke-width", 6);
  countriesLevelGauge.resize(
    { value: baseDataPoint.Counts.unrecognized, label: "unrecognized" },
    { value: baseDataPoint.Counts.recognized, label: "recognized" }
  );
});
