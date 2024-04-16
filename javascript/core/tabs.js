const svgTab = {
  title: "untitled",
  parentSvg: null,
  totalCount: 0,
  index: 0,
  clickCallback: null,
  _position: [0, 0],
  _underline: null,
  _svgElement: null,
  _style: {
    rowPadding: 100,
    yPosiiton: 50,
  },
  _clickCallback: (_self) => {
    return function (e) {
      _self.parentSvg.selectAll("line.svg-tab-underline").remove();
      _self._underline = _self.parentSvg
        .append("line")
        .attr("class", "svg-tab-underline")
        .attr("x1", _self._position[0])
        .attr("y1", _self._position[1] + 5)
        .attr("x2", _self._position[0] + this.getComputedTextLength())
        .attr("y2", _self._position[1] + 5)
        .attr("stroke", "#ffd43c")
        .attr("stroke-width", "3");
      _self.clickCallback(e);
    };
  },
  render: function () {
    // calculate tab position
    var tabWidth =
      (getSvgDimensions(this.parentSvg).width - this._style.rowPadding * 2) /
      this.totalCount;
    this._position = [
      this._style.rowPadding +
        tabWidth * this.index +
        tabWidth / 2 -
        this.title.length,
      this._style.yPosiiton,
    ];
    // render tab
    this._svgElement = this.parentSvg
      .append("text")
      .attr("x", this._position[0])
      .attr("y", this._position[1])
      .attr("id", this.title)
      .text(this.title)
      .style("cursor", "pointer")
      .on("click", this._clickCallback(this));
  },
  dispatchClick: function () {
    this._svgElement.dispatch("click");
  },
  reset: function () {
    this._underline.remove();
  },
};
