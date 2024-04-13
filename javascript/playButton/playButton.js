function PlayButton(svg, clickCallback) {
  this.svg = svg;
  this.clickCallback = clickCallback;
  this._clickCallback = function (_self) {
    return function (e) {
      _self._group.remove();
      _self.clickCallback(e);
    };
  };
  this._group = this.svg.append("g");
  this._rect = this._group
    .append("rect")
    .attr("width", this.svg.attr("width"))
    .attr("height", this.svg.attr("height"))
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#fff")
    .attr("opacity", 0);
  this._polygonStart = [
    this.svg.attr("width") / 2 - 50,
    this.svg.attr("height") / 2 - 50,
  ];
  this._polygonEnd = [
    parseInt(this.svg.attr("width")) / 2 + 50,
    parseInt(this.svg.attr("height")) / 2 + 50,
  ];
  this._group
    .append("polygon")
    .attr(
      "points",
      `${this._polygonStart[0]},${this._polygonStart[1]} ${
        this._polygonStart[0]
      },${this._polygonEnd[1]} ${this._polygonEnd[0]},${
        this._polygonStart[1] + 50
      }`
    )
    .attr("fill", "#f2e863")
    .style("cursor", "pointer")
    .on("click", this._clickCallback(this));
}
