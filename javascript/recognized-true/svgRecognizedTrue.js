/////Drawing line, square, circle, triangle.

const svgRecognizedTrue = d3.select("#recognized-true");
const svgRecognizedTrueObj = { width: 1000, height: 300 };

svgRecognizedTrue
  .attr("width", svgRecognizedTrueObj.width)
  .attr("height", svgRecognizedTrueObj.height);

svgRecognizedTrue
  .append("rect")
  .attr("id", "outerRect")
  .attr("width", svgRecognizedTrueObj.width)
  .attr("height", svgRecognizedTrueObj.height)
  .attr("fill", "none")
  .attr("stroke", "black");

const words = ["dishwasher", "necklace", "fans"];

const positions = [
  { x: svgRecognizedTrueObj.width / 2 - 120, y: 50 },
  { x: svgRecognizedTrueObj.width / 2, y: 50 },
  { x: svgRecognizedTrueObj.width / 2 + 120, y: 50 },
];

const appendRectsWithImages = (elm, numRects, imagePaths) => {
  svgRecognizedTrue
    .selectAll(`rect:not(#${"outerRect"}), image, circle`)
    .remove();

  const rectSize = 90;
  const padding = 15;
  const totalRectsWidth = numRects * (rectSize + padding) - padding;
  const startX = (svgRecognizedTrueObj.width - totalRectsWidth) / 2;
  const startY = svgRecognizedTrueObj.height / 2 - rectSize / 2;

  const group = svgRecognizedTrue
    .selectAll("g")
    .data(d3.range(numRects))
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(${startX + i * (rectSize + padding)}, ${startY})`
    );

  group
    .append("rect")
    .attr("id", (d, i) => `${elm}${i}`)
    .attr("width", rectSize)
    .attr("height", rectSize)
    .attr("fill", "white")
    .attr("stroke", "black");

  group
    .append("image")
    .attr("href", (d, i) => imagePaths[i % imagePaths.length])
    .attr("width", rectSize)
    .attr("height", rectSize)
    .attr("preserveAspectRatio", "xMidYMid meet");
};

words.forEach((word, index) => {
  svgRecognizedTrue
    .append("text")
    .attr("x", positions[index].x)
    .attr("y", positions[index].y)
    .attr("id", word)
    .text(word)
    .on("click", function () {
      d3.selectAll("line").remove();
      d3.selectAll("g").remove();

      svgRecognizedTrue
        .append("line")
        .attr("x1", positions[index].x)
        .attr("y1", positions[index].y + 5)
        .attr("x2", positions[index].x + this.getComputedTextLength())
        .attr("y2", positions[index].y + 5)
        .attr("stroke", "black")
        .attr("id", `underline-${index}`);

      if (this.id === "dishwasher") {
        const imagePaths = [
          "./media/recognized_false/dishwasher/training/counter_6290128794288128.png",
          "./media/recognized_false/dishwasher/training/shower_6592988111175680.png",
          "./media/recognized_false/dishwasher/training/person_5253290134601728.png",
          "./media/recognized_false/dishwasher/training/sink_6205822780571648.png",
        ];
        appendRectsWithImages("dishwasher", 4, imagePaths);
      }

      if (this.id == "fans") {
        const imagePaths = [
          "./media/recognized_true/fan/fan_4577771776901120.png",
          "./media/recognized_true/fan/fan_4678906005159936.png",
          "./media/recognized_true/fan/fan_5584477730373632.png",
          "./media/recognized_true/fan/fan_6085005014990848.png",
          "./media/recognized_true/fan/fan_6449103636529152.png",
          "./media/recognized_true/fan/fan_6503565348569088.png",
        ];
        appendRectsWithImages(
          "fans",
          6,
          imagePaths
          //   ["orange", "orange", "orange", "orange", "orange", "green"],
          //   [
          //     "windmill or fan",
          //     "windmill or fan",
          //     "windmill or fan",
          //     "windmill or fan",
          //     "windmill or fan",
          //     "correct",
          //   ]
        );
      }
      if (this.id == "necklace") {
        console.log(this.id);
        const imagePaths = [
          "./media/recognized_true/necklace/necklace_4682831118729216.png",
          "./media/recognized_true/necklace/necklace_4788198762872832.png",
          "./media/recognized_true/necklace/necklace_5286072449761280.png",
          "./media/recognized_true/necklace/necklace_5337218526740480.png",
          "./media/recognized_true/necklace/necklace_5486335764725760.png",
          "./media/recognized_true/necklace/necklace_5960691955531776.png",
        ];
        appendRectsWithImages(
          "necklace",
          6,
          imagePaths
          //   ["green", "green", "green", "green", "green", "green"],
          //   ["correct", "correct", "correct", "correct", "correct", "correct"]
        );
      }
    });
});
