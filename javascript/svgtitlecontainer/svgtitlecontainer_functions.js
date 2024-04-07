const tc_totalDuration = 750;

const tc_drawStroke = (data, group, index) => {
  if (index < data.length) {
    const stroke = data[index];

    const path = group
      .append("path")
      .attr("d", createPath(stroke))
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
