const svgTitleContainer = d3.select("#svg-title-container");
svgTitleContainer.attr("width", "50%").attr("height", "100%");

const tc_rect = svgTitleContainer
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "none")
  .attr("stroke", "black");

const tc_houseGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 12) scale(0.5)");

const tc_monalisaGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(100, 12) scale(0.5)");

const tc_tornadoGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(190, 12) scale(0.5)");

const tc_beardGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 180) scale(0.5)");

const tc_cookieGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(130, 180) scale(0.5)");

const tc_flowerGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(240, 180) scale(0.5)");

const tc_blackberryGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 340) scale(0.5)");

const tc_greatWallGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(150, 340) scale(0.5)");

const tc_seesawGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(150, 400) scale(0.5)");

const tc_soccerBallGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 450) scale(0.5)");

const tc_skyscraperGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(320, 340) scale(0.5)");

const tc_stitchesGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(150, 500) scale(0.5)");

const tc_teapotGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 570) scale(0.5)");

const tc_toothGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(150, 570) scale(0.5)");

const tc_squareGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(300, 570) scale(0.5)");

const tc_seaTurtleGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(10, 700) scale(0.5)");

const tc_snowmanGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(140, 720) scale(0.5)");

const tc_eiffelTowerGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(240, 720) scale(0.5)");

const tc_stethoscopeGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(350, 720) scale(0.5)");

const tc_rifleGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(350, 800) scale(0.5)");

const tc_fanGroup = svgTitleContainer
  .append("g")
  .attr("transform", "translate(490, 720) scale(0.5)");

tc_drawStroke(tc_houseData, tc_houseGroup, 0);
tc_drawStroke(tc_monaLisaData, tc_monalisaGroup, 0);
tc_drawStroke(tc_tornadoData, tc_tornadoGroup, 0);
tc_drawStroke(tc_beardData, tc_beardGroup, 0);
tc_drawStroke(tc_cookieData, tc_cookieGroup, 0);
tc_drawStroke(tc_flowerData, tc_flowerGroup, 0);
tc_drawStroke(tc_blackberryData, tc_blackberryGroup, 0);
tc_drawStroke(tc_greatWallData, tc_greatWallGroup, 0);
tc_drawStroke(tc_seesawData, tc_seesawGroup, 0);
tc_drawStroke(tc_soccerBallData, tc_soccerBallGroup, 0);
tc_drawStroke(tc_skyscraperData, tc_skyscraperGroup, 0);
tc_drawStroke(tc_stitchesData, tc_stitchesGroup, 0);
tc_drawStroke(tc_teapotData, tc_teapotGroup, 0);
tc_drawStroke(tc_toothData, tc_toothGroup, 0);
tc_drawStroke(tc_squareData, tc_squareGroup, 0);
tc_drawStroke(tc_seaTurtleData, tc_seaTurtleGroup, 0);
tc_drawStroke(tc_snowmanData, tc_snowmanGroup, 0);
tc_drawStroke(tc_eiffelTowerData, tc_eiffelTowerGroup, 0);
tc_drawStroke(tc_stethoscopeData, tc_stethoscopeGroup, 0);
tc_drawStroke(tc_rifleData, tc_rifleGroup, 0);
tc_drawStroke(tc_fanData, tc_fanGroup, 0);

tc_appendRectToGroup(tc_houseGroup, "House");
tc_appendRectToGroup(tc_monalisaGroup, "The Mona Lisa");
tc_appendRectToGroup(tc_tornadoGroup, "Tornado");
tc_appendRectToGroup(tc_beardGroup, "Beard");
tc_appendRectToGroup(tc_cookieGroup, "Cookie");
tc_appendRectToGroup(tc_flowerGroup, "Flower");
tc_appendRectToGroup(tc_blackberryGroup, "Blackberry");
tc_appendRectToGroup(tc_greatWallGroup, "Great Wall");
tc_appendRectToGroup(tc_seesawGroup, "Seesaw");
tc_appendRectToGroup(tc_soccerBallGroup, "Soccer Ball");
tc_appendRectToGroup(tc_skyscraperGroup, "Skyscraper");
tc_appendRectToGroup(tc_stitchesGroup, "Stitches");
tc_appendRectToGroup(tc_teapotGroup, "Teapot");
tc_appendRectToGroup(tc_toothGroup, "Tooth");
tc_appendRectToGroup(tc_squareGroup, "Square");
tc_appendRectToGroup(tc_seaTurtleGroup, "Sea Turtle");
tc_appendRectToGroup(tc_snowmanGroup, "Snowman");
tc_appendRectToGroup(tc_eiffelTowerGroup, "Eiffel Tower");
tc_appendRectToGroup(tc_stethoscopeGroup, "Stethoscope");
tc_appendRectToGroup(tc_rifleGroup, "Rifle");
tc_appendRectToGroup(tc_fanGroup, "Fan");
