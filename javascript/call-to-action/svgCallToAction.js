const svgCallToAction = d3.select("#call-to-action");

var callToActionInfographic = Object.create(infographicContainer);
callToActionInfographic.svg = svgCallToAction;
callToActionInfographic.render();

const rows = 3;
const columns = 5;

const rectSize = 90;
const padding = 60;

const gridWidth = columns * rectSize + (columns - 1) * padding;
const gridHeight = rows * rectSize + (rows - 1) * padding;

const startX = (callToActionInfographic.getDimensions().width - gridWidth) / 2;
const startY =
  (callToActionInfographic.getDimensions().height - gridHeight) / 2;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const x = startX + j * (rectSize + padding);
    const y = startY + i * (rectSize + padding);

    svgCallToAction
      .append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", rectSize)
      .attr("height", rectSize)
      .attr("stroke", "#ffd43c")
      .attr("fill", "none")
      .attr("stroke-width", "6");
  }
}

// const paths = [
//   { d: "M109 484L809 252", x1: 109, y1: 484, x2: 809, y2: 252 },
//   { d: "M25 257.254L725 25.2539", x1: 25, y1: 257.254, x2: 725, y2: 25.2539 },
//   { d: "M54.573 330L724.573 25", x1: 54.573, y1: 330, x2: 724.573, y2: 25 },
//   { d: "M53 338L753 106", x1: 53, y1: 338, x2: 753, y2: 106 },
//   { d: "M83 411L753 106", x1: 83, y1: 411, x2: 753, y2: 106 },
//   { d: "M79 410L779 178", x1: 79, y1: 410, x2: 779, y2: 178 },
//   { d: "M109 483L779 178", x1: 109, y1: 483, x2: 779, y2: 178 },
//   { d: "M139 560L809 255", x1: 139, y1: 560, x2: 809, y2: 255 },
//   { d: "M139 562L839 330", x1: 139, y1: 562, x2: 839, y2: 330 },
//   { d: "M169 635L839 330", x1: 169, y1: 635, x2: 839, y2: 330 },
//   { d: "M171 638L871 406", x1: 171, y1: 638, x2: 871, y2: 406 },
//   { d: "M201 711L871 406", x1: 201, y1: 711, x2: 871, y2: 406 },
//   { d: "M201 714L901 482", x1: 201, y1: 714, x2: 901, y2: 482 },
//   { d: "M231 787L901 482", x1: 231, y1: 787, x2: 901, y2: 482 },
// ];

// paths.forEach(function (pathData) {
//   svgCallToAction
//     .append("path")
//     .attr("d", pathData.d)
//     .attr("stroke", "#FFD43C")
//     .attr("stroke-width", 50)
//     .attr("stroke-linecap", "round");
// });
