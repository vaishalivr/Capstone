const getNumericPropertyValue = function (element, propertyName) {
  var propertyValue = 0;
  propertyValue = parseInt(element.attr(propertyName));
  if (isNaN(propertyValue)) {
    propertyValue = parseInt(element.style(propertyName));
  }
  return propertyValue;
};

const getSvgDimensions = function (svg) {
  return {
    width: getNumericPropertyValue(svg, "width"),
    height: getNumericPropertyValue(svg, "height"),
  };
};

const createPath = (stroke) => {
  let d = `M ${stroke[0][0]} ${stroke[1][0]}`;
  for (let i = 1; i < stroke[0].length; i++) {
    d += ` L ${stroke[0][i]} ${stroke[1][i]}`;
  }
  return d;
};

const scaleGroupToGridCell = (group, translateX, translateY) => {
  const bbox = group.node().getBBox();
  var xScale = Math.min(1, 90 / bbox.width);
  var yScale = Math.min(1000, 90 / bbox.height);

  group.attr(
    "transform",
    `translate(${translateX}, ${translateY}) scale(${xScale}, ${yScale})`
  );
};

const attachHoverEffectToGroup = (group, options) => {
  //console.log(options);
  const bbox = group.node().getBBox();
  const hasHelpText = typeof options.helpText != "undefined";
  var tooltipText;

  if (hasHelpText) {
    tooltipText = group
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("x", bbox.x + bbox.width / 2)
      .attr("y", bbox.y + bbox.height + 30)
      .text(options.helpText)
      .attr("font-size", "1.5rem")
      .attr("text-anchor", "middle")
      .style("visibility", "hidden");
  }

  var rect = group
    .append("rect")
    .attr("x", bbox.x)
    .attr("y", bbox.y)
    .attr("width", bbox.width)
    .attr("height", bbox.height)
    .attr("stroke", "#ffd43c")
    .attr("stroke-width", 6)
    .attr("fill", "none")
    .attr("opacity", 0.01);

  group
    .append("rect")
    .attr("x", bbox.x)
    .attr("y", bbox.y)
    .attr("width", bbox.width)
    .attr("height", bbox.height)
    .attr("stroke", "#ffd43c")
    .attr("stroke-width", 6)
    .attr("fill", "#ffffff")
    .attr("opacity", 0)
    .on("mouseover", () => {
      if (hasHelpText) {
        tooltipText.style("visibility", "visible");
      }
      rect.attr("opacity", 1);
      if (typeof options.mouseover != "undefined") {
        options.mouseover();
      }
    })
    .on("mouseout", () => {
      if (hasHelpText) {
        tooltipText.style("visibility", "hidden");
      }
      rect.attr("opacity", 0);
      if (typeof options.mouseout != "undefined") {
        options.mouseout();
      }
    });
};
