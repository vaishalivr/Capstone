const levelGaugeWidget = {
  parentSvg: null,
  parentSvgHeight: 0,
  _hashedRect: null,
  _solidRect: null,
  _hashedText: null,
  _solidText: null,
  _style: { height: 60 },
  render: function () {
    this.parentSvgHeight = parseInt(this.parentSvg.style("height"));
    var hashedGroup = this.parentSvg.append("g");
    hashedGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - this._style.height / 2)
      .attr("width", getSvgDimensions(this.parentSvg).width)
      .attr("height", this._style.height / 2)
      .attr("fill", "url(#hashPattern)")
      .attr("stroke", "#ffd43c")
      .attr("opacity", 0.25);
    this._hashedRect = hashedGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - this._style.height / 2)
      .attr("width", 0)
      .attr("height", this._style.height / 2)
      .attr("fill", "url(#hashPattern)")
      .attr("stroke", "#ffd43c")
      .attr("stroke-width", "2");
    this._hashedText = hashedGroup
      .append("text")
      .attr("x", 20)
      .attr("y", this.parentSvgHeight - this._style.height / 2 + 20)
      .attr("class", "level-gauge-indicator-text");

    var solidGroup = this.parentSvg.append("g");
    solidGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - this._style.height)
      .attr("width", getSvgDimensions(this.parentSvg).width)
      .attr("height", this._style.height / 2)
      .attr("fill", "#ffd43c")
      .attr("stroke", "#ffd43c")
      .attr("opacity", 0.45);
    this._solidRect = solidGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - this._style.height)
      .attr("width", 0)
      .attr("height", this._style.height / 2)
      .attr("fill", "#ffd43c")
      .attr("stroke", "#ffd43c")
      .attr("stroke-width", "2");
    this._solidText = solidGroup
      .append("text")
      .attr("x", 20)
      .attr("y", this.parentSvgHeight - this._style.height + 20)
      .attr("class", "level-gauge-indicator-text");
  },
  reset: function () {
    this._hashedText.text("");
    this._solidText.text("");
    this._hashedRect.attr("width", 0);
    this._solidRect.attr("width", 0);
  },
  resize: function (hashedLevel, solidLevel) {
    var totalLevels = hashedLevel.value + solidLevel.value;
    var hashedLevelPercentage = (
      (hashedLevel.value / totalLevels) *
      100
    ).toFixed(2);
    var solidLevelPercentage = ((solidLevel.value / totalLevels) * 100).toFixed(
      2
    );

    this._hashedText.text(hashedLevelPercentage + "% unrecognized drawings");
    this._hashedRect
      .transition()
      .duration(750)
      .attr(
        "width",
        (getSvgDimensions(this.parentSvg).width * hashedLevel.value) /
          totalLevels
      );

    this._solidRect
      .transition()
      .duration(750)
      .attr(
        "width",
        (getSvgDimensions(this.parentSvg).width * solidLevel.value) /
          totalLevels
      );
    this._solidText.text(solidLevelPercentage + "% recognized drawings");
  },
};
