const capstoneGlobals = {
  svgStyle: { width: 1000, height: 450, strokeWidth: 3 },
  svgTab: {
    rowPadding: 100,
    yPosiiton: 50,
  },
  levelGauge: {
    height: 60,
  },
};

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

const scaleGroupToGridCell = (group, translateX, translateY) => {
  const bbox = group.node().getBBox();
  var xScale = Math.min(1, 90 / bbox.width);
  var yScale = Math.min(1000, 90 / bbox.height);

  group.attr(
    "transform",
    `translate(${translateX}, ${translateY}) scale(${xScale}, ${yScale})`
  );
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

const levelGaugeWidget = {
  parentSvg: null,
  parentSvgHeight: 0,
  _hashedRect: null,
  _solidRect: null,
  _hashedText: null,
  _solidText: null,
  render: function () {
    // this.parentSvg
    //   .append("line")
    //   .attr("class", "svg-levelGauge-line")
    //   .attr("x1", 0)
    //   .attr("y1", this.parentSvgHeight - capstoneGlobals.levelGauge.height)
    //   .attr("x2", capstoneGlobals.svgStyle.width)
    //   .attr("y2", this.parentSvgHeight - capstoneGlobals.levelGauge.height)
    //   .attr("stroke", "black");

    var hashedGroup = this.parentSvg.append("g");
    hashedGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - (capstoneGlobals.levelGauge.height / 2))
      .attr("width", capstoneGlobals.svgStyle.width)
      .attr("height", capstoneGlobals.levelGauge.height / 2)
      .attr("fill", "url(#hashPattern)")
      .attr("stroke", "#ffd43c")
      .attr("opacity", 0.25);
    this._hashedRect = hashedGroup.append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - (capstoneGlobals.levelGauge.height / 2))
      .attr("width", 0)
      .attr("height", capstoneGlobals.levelGauge.height / 2)
      .attr("fill", "url(#hashPattern)")
      .attr("stroke", "#ffd43c");
    this._hashedText = hashedGroup
      .append("text")
      .attr("x", 20)
      .attr("y", this.parentSvgHeight - (capstoneGlobals.levelGauge.height / 2) + 20)
      .attr("class", "level-gauge-indicator-text");

    var solidGroup = this.parentSvg.append("g");
    solidGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - capstoneGlobals.levelGauge.height)
      .attr("width", capstoneGlobals.svgStyle.width)
      .attr("height", capstoneGlobals.levelGauge.height / 2)
      .attr("fill", "#ffd43c")
      .attr("stroke", "#ffd43c").attr("opacity", 0.25);
    this._solidRect = solidGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", this.parentSvgHeight - capstoneGlobals.levelGauge.height)
      .attr("width", 0)
      .attr("height", capstoneGlobals.levelGauge.height / 2)
      .attr("fill", "#ffd43c")
      .attr("stroke", "#ffd43c");
    this._solidText = solidGroup
      .append("text")
      .attr("x", 20)
      .attr("y", this.parentSvgHeight - capstoneGlobals.levelGauge.height + 20).attr("class", "level-gauge-indicator-text");;
  },
  resize: function (hashedLevel, solidLevel) {
    var totalLevels = hashedLevel.value + solidLevel.value;
    var hashedLevelPercentage = ((hashedLevel.value / totalLevels) * 100).toFixed(2);
    var solidLevelPercentage = ((solidLevel.value / totalLevels) * 100).toFixed(2);

    this._hashedText.text(hashedLevelPercentage + "% unrecognized drawings");
    this._hashedRect
      .transition()
      .duration(750)
      .attr(
        "width",
        (capstoneGlobals.svgStyle.width * hashedLevel.value) / totalLevels
      );
      
    this._solidRect
      .transition()
      .duration(750)
      .attr(
        "width",
        (capstoneGlobals.svgStyle.width * solidLevel.value) / totalLevels
      );
    this._solidText.text(solidLevelPercentage + "% recognized drawings");
  },
};
const svgTab = {
  title: "untitled",
  parentSvg: null,
  totalCount: 0,
  index: 0,
  clickCallback: null,
  _position: [0, 0],
  _underline: null,
  _svgElement: null,
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
      (capstoneGlobals.svgStyle.width - capstoneGlobals.svgTab.rowPadding * 2) /
      this.totalCount;
    this._position = [
      capstoneGlobals.svgTab.rowPadding +
      tabWidth * this.index +
      tabWidth / 2 -
      this.title.length,
      capstoneGlobals.svgTab.yPosiiton,
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
