const resizeBar = (svgId, width, height) => {
  d3.select(svgId)
    .transition()
    .duration(750)
    .attr("x", 0)
    .attr("y", height - 60)
    .attr("height", height - 60)
    .attr("width", width);
};

const createPath = (stroke) => {
  let d = `M ${stroke[0][0]} ${stroke[1][0]}`;
  for (let i = 1; i < stroke[0].length; i++) {
    d += ` L ${stroke[0][i]} ${stroke[1][i]}`;
  }
  return d;
};

const attachHoverEffectToGroup = (group, options) => {
  const bbox = group.node().getBBox();
  const hasHelpText = typeof options.helpText != "undefined";
  var tooltipText;

  if (hasHelpText) {
    tooltipText = group
      .append("text")
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
    .attr("width", bbox.width + 10)
    .attr("height", bbox.height + 10)
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
