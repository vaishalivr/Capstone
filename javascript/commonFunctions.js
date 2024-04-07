const resizeBar = (svgId, width, height) => {
  d3.select(svgId)
    .transition()
    .duration(750)
    .attr("x", 0)
    .attr("y", height - 60)
    .attr("height", height - 60)
    .attr("width", width);
};
