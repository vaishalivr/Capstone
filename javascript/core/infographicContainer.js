const infographicContainer = {
  svg: null,
  styles: { bgcolor: "#fff" },
  height: null,
  _background: null,
  _graphicStage: null,
  _changeGraphicHandler: (_self) => {
    return function (e) {
      var bbox = _self._graphicStage.node().getBBox();
      _self._graphicStage.attr(
        "transform",
        `translate(${(_self.getDimensions().width - bbox.width) / 2}, ${
          (_self.getDimensions().height - bbox.height) / 2
        })`
      );
    };
  },
  alignGraphicStage: function () {
    var bbox = this._graphicStage.node().getBBox();
    this._graphicStage.attr(
      "transform",
      `translate(${(this.getDimensions().width - bbox.width) / 2}, ${
        (this.getDimensions().height - bbox.height) / 2
      })`
    );
  },
  addGraphicComponent: function (component) {
    this._graphicStage.append(() => component.node());
  },
  resetGraphic: function () {
    var elements = this._graphicStage.selectAll("*");
    if (!elements.empty()) {
      elements.remove();
    }
  },
  render: function () {
    if (this.height != null) {
      this.svg.style("height", this.height);
    }
    this._background = this.svg
      .append("rect")
      .attr("class", "infographic-bg")
      .attr("width", this.getDimensions().width)
      .attr("height", this.getDimensions().height)
      .attr("fill", this.styles.bgcolor)
      .attr("opacity", 0.4);
    this._graphicStage = this.svg
      .append("g")
      .on("change", this._changeGraphicHandler(this));
  },
  getDimensions: function () {
    return getSvgDimensions(this.svg);
  },
};
