function FloatingTooltip(svgContainer, options = {}) {
  this.svg = svgContainer;
  this.tooltipText = options["tooltipText"];
  this.tooltipPlacement = options["tooltipPlacement"];
  _textSize = "0.9rem";

  this.svg.append("g");
  this.svg.append("");
}
