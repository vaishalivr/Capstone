const tc_totalDuration = 750;

const tc_createPath = (stroke) => {
  let d = `M ${stroke[0][0]} ${stroke[1][0]}`;
  for (let i = 1; i < stroke[0].length; i++) {
    d += ` L ${stroke[0][i]} ${stroke[1][i]}`;
  }
  return d;
};

const tc_drawStroke = (data, group, index) => {
  if (index < data.length) {
    const stroke = data[index];

    const path = group
      .append("path")
      .attr("d", tc_createPath(stroke))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "2");

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(tc_totalDuration / data.length)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", () => {
        setTimeout(() => {
          tc_drawStroke(data, group, index + 1, tc_totalDuration);
        }, (tc_totalDuration * 3) / data.length);
      });
  }
};

const tc_appendRectToGroup = (group, tooltip) => {
  setTimeout(() => {
    const bbox = group.node().getBBox();
    const rect = group
      .append("rect")
      .attr("id", tooltip)
      .attr("x", bbox.x)
      .attr("y", bbox.y)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      .attr("fill", "#808080")
      .attr("visibility", "hidden")
      .attr("opacity", 0.1);

    const line = group
      .append("line")
      .attr("x1", bbox.x)
      .attr("y1", bbox.y + bbox.height)
      .attr("x2", bbox.x + bbox.width)
      .attr("y2", bbox.y + bbox.height)
      .attr("stroke", "#ffd43c")
      .attr("stroke-width", 6)
      .style("visibility", "hidden");

    const tooltipText = group
      .append("text")
      .attr("x", bbox.x + bbox.width / 2)
      .attr("y", bbox.y + bbox.height + 30)
      .text(tooltip)
      .attr("font-size", "1.5rem")
      .attr("font-family", "'Permanent Marker', cursive")
      .attr("text-anchor", "middle")
      .style("visibility", "hidden");

    group.on("mouseover", (e, d) => {
      line.style("visibility", "visible");
      tooltipText.style("visibility", "visible");
      rect.style("visibility", "visible");
    });

    group.on("mouseout", () => {
      line.style("visibility", "hidden");
      tooltipText.style("visibility", "hidden");
      rect.style("visibility", "hidden");
    });
  }, 3500);
};
