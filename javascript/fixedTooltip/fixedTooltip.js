function FixedTooltip(svgContainer, options = {}) {
  this.svg = svgContainer;

  this._group = d3
    .create("svg:g")
    .attr(
      "transform",
      `translate(${options.position.x}, ${options.position.y})`
    );
  this._group
    .append("line")
    .attr("stroke", "#ffd43c")
    .attr("stroke-width", 6)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", options.size)
    .attr("y2", 0);
  this._helpText = this._group
    .append("text")
    .attr("y", 20)
    .attr("font-family", "Just Me Again Down Here")
    .attr("font-size", "1.8rem");
  this.showWithText = function (helpText) {
    this.svg.append(() => this._group.node());
    this._helpText.text(helpText);
    this._helpText.attr(
      "x",
      (options.size - this._helpText.getComputedTextLength()) / 2
    );
  };
  this.hide = function () {
    this._group.remove();
  };
}
