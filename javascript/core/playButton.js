function PlayButton(svg, options, clickCallback) {
  this.svg = svg;
  this._containerWidth = options["containerWidth"];
  this._containerHeight = options["containerHeight"];
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
    .attr("width", this._containerWidth)
    .attr("height", this._containerHeight)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#fff")
    .attr("opacity", 0);
  this._polygonStart = [
    this._containerWidth / 2 - 50,
    this._containerHeight / 2 - 50,
  ];
  this._polygonEnd = [
    this._containerWidth / 2 + 50,
    this._containerHeight / 2 + 50,
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
    .attr("fill", "#ffd43c")
    .style("cursor", "pointer")
    .on("click", this._clickCallback(this));
}
