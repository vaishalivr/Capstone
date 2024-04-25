const countriesArray = [
  {
    Country: "Algeria",
    Total: 627,
    Counts: { recognized: 512, unrecognized: 115 },
  },
  {
    Country: "Argentina",
    Total: 1186,
    Counts: { recognized: 1020, unrecognized: 166 },
  },
  {
    Country: "Australia",
    Total: 13677,
    Counts: { recognized: 12347, unrecognized: 1330 },
  },
  {
    Country: "Austria",
    Total: 2294,
    Counts: { recognized: 2094, unrecognized: 200 },
  },
  {
    Country: "Belarus",
    Total: 822,
    Counts: { recognized: 748, unrecognized: 74 },
  },
  {
    Country: "Belgium",
    Total: 1704,
    Counts: { recognized: 1569, unrecognized: 135 },
  },
  {
    Country: "Bosnia",
    Total: 1161,
    Counts: { recognized: 1022, unrecognized: 139 },
  },
  {
    Country: "Brazil",
    Total: 8977,
    Counts: { recognized: 8363, unrecognized: 614 },
  },
  {
    Country: "Bulgaria",
    Total: 2577,
    Counts: { recognized: 2301, unrecognized: 276 },
  },
  {
    Country: "Cambodia",
    Total: 693,
    Counts: { recognized: 623, unrecognized: 70 },
  },
  {
    Country: "Canada",
    Total: 21570,
    Counts: { recognized: 19621, unrecognized: 1949 },
  },
  {
    Country: "Chile",
    Total: 748,
    Counts: { recognized: 669, unrecognized: 79 },
  },
  {
    Country: "Colombia",
    Total: 654,
    Counts: { recognized: 576, unrecognized: 78 },
  },
  {
    Country: "Croatia",
    Total: 2794,
    Counts: { recognized: 2464, unrecognized: 330 },
  },
  {
    Country: "Czech Republic",
    Total: 8921,
    Counts: { recognized: 7726, unrecognized: 1195 },
  },
  {
    Country: "Denmark",
    Total: 2139,
    Counts: { recognized: 1951, unrecognized: 188 },
  },
  {
    Country: "Egypt",
    Total: 776,
    Counts: { recognized: 670, unrecognized: 106 },
  },
  {
    Country: "Estonia",
    Total: 1270,
    Counts: { recognized: 1078, unrecognized: 192 },
    helpText: "proportion of entries from Estonia",
  },
  {
    Country: "Finland",
    Total: 10861,
    Counts: { recognized: 9894, unrecognized: 967 },
  },
  {
    Country: "France",
    Total: 8577,
    Counts: { recognized: 7916, unrecognized: 661 },
  },
  {
    Country: "Germany",
    Total: 17329,
    Counts: { recognized: 16046, unrecognized: 1283 },
  },
  {
    Country: "Greece",
    Total: 899,
    Counts: { recognized: 826, unrecognized: 73 },
  },
  {
    Country: "Hong Kong",
    Total: 2311,
    Counts: { recognized: 2073, unrecognized: 238 },
  },
  {
    Country: "Hungary",
    Total: 6638,
    Counts: { recognized: 5155, unrecognized: 1483 },
  },
  {
    Country: "India",
    Total: 3288,
    Counts: { recognized: 2819, unrecognized: 469 },
  },
  {
    Country: "Indonesia",
    Total: 4326,
    Counts: { recognized: 3763, unrecognized: 563 },
  },
  {
    Country: "Iraq",
    Total: 792,
    Counts: { recognized: 592, unrecognized: 200 },
  },
  {
    Country: "Ireland",
    Total: 2803,
    Counts: { recognized: 2442, unrecognized: 361 },
  },
  {
    Country: "Israel",
    Total: 1438,
    Counts: { recognized: 1276, unrecognized: 162 },
  },
  {
    Country: "Italy",
    Total: 8739,
    Counts: { recognized: 7522, unrecognized: 1217 },
  },
  {
    Country: "Japan",
    Total: 3496,
    Counts: { recognized: 3270, unrecognized: 226 },
  },
  {
    Country: "Jordan",
    Total: 547,
    Counts: { recognized: 463, unrecognized: 84 },
  },
  {
    Country: "Kazakhstan",
    Total: 932,
    Counts: { recognized: 851, unrecognized: 81 },
  },
  {
    Country: "Korea",
    Total: 6852,
    Counts: { recognized: 6553, unrecognized: 299 },
  },
  {
    Country: "Kuwait",
    Total: 794,
    Counts: { recognized: 678, unrecognized: 116 },
  },
  {
    Country: "Latvia",
    Total: 817,
    Counts: { recognized: 727, unrecognized: 90 },
  },
  {
    Country: "Lithuania",
    Total: 970,
    Counts: { recognized: 869, unrecognized: 101 },
  },
  {
    Country: "Malaysia",
    Total: 2515,
    Counts: { recognized: 2243, unrecognized: 272 },
  },
  {
    Country: "Mexico",
    Total: 1858,
    Counts: { recognized: 1617, unrecognized: 241 },
  },
  {
    Country: "Netherlands",
    Total: 6183,
    Counts: { recognized: 5523, unrecognized: 660 },
  },
  {
    Country: "New Zealand",
    Total: 2779,
    Counts: { recognized: 2500, unrecognized: 279 },
  },
  {
    Country: "Norway",
    Total: 2987,
    Counts: { recognized: 2743, unrecognized: 244 },
  },
  {
    Country: "Philippines",
    Total: 6137,
    Counts: { recognized: 5283, unrecognized: 854 },
  },
  {
    Country: "Poland",
    Total: 7476,
    Counts: { recognized: 6569, unrecognized: 907 },
  },
  {
    Country: "Portugal",
    Total: 2000,
    Counts: { recognized: 1836, unrecognized: 164 },
  },
  {
    Country: "Qatar",
    Total: 667,
    Counts: { recognized: 588, unrecognized: 79 },
  },
  {
    Country: "Romania",
    Total: 3966,
    Counts: { recognized: 3405, unrecognized: 561 },
    helpText: "proportion of entries from Romania",
  },
  {
    Country: "Russia",
    Total: 13058,
    Counts: { recognized: 11822, unrecognized: 1236 },
  },
  {
    Country: "Saudi Arabia",
    Total: 6742,
    Counts: { recognized: 5227, unrecognized: 1515 },
  },
  {
    Country: "Serbia",
    Total: 2316,
    Counts: { recognized: 2069, unrecognized: 247 },
  },
  {
    Country: "Singapore",
    Total: 1728,
    Counts: { recognized: 1566, unrecognized: 162 },
  },
  {
    Country: "Slovakia",
    Total: 4261,
    Counts: { recognized: 3755, unrecognized: 506 },
  },
  {
    Country: "Slovenia",
    Total: 644,
    Counts: { recognized: 597, unrecognized: 47 },
  },
  {
    Country: "South Africa",
    Total: 1057,
    Counts: { recognized: 960, unrecognized: 97 },
  },
  {
    Country: "Spain",
    Total: 2140,
    Counts: { recognized: 1963, unrecognized: 177 },
  },
  {
    Country: "Sweden",
    Total: 11165,
    Counts: { recognized: 10147, unrecognized: 1018 },
  },
  {
    Country: "Switzerland",
    Total: 2098,
    Counts: { recognized: 1940, unrecognized: 158 },
  },
  {
    Country: "Taiwan",
    Total: 3290,
    Counts: { recognized: 3022, unrecognized: 268 },
  },
  {
    Country: "Thailand",
    Total: 7269,
    Counts: { recognized: 6358, unrecognized: 911 },
  },
  {
    Country: "Ukraine",
    Total: 3247,
    Counts: { recognized: 2912, unrecognized: 335 },
  },
  {
    Country: "UAE",
    Total: 3144,
    Counts: { recognized: 2708, unrecognized: 436 },
  },
  {
    Country: "United Kingdom",
    Total: 40899,
    Counts: { recognized: 36098, unrecognized: 4801 },
  },
  {
    Country: "Vietnam",
    Total: 3602,
    Counts: { recognized: 3158, unrecognized: 444 },
  },
  {
    Country: "Zimbabwe",
    Total: 1700,
    Counts: { recognized: 1000, unrecognized: 700 },
  },
  {
    Country: "United States",
    Total: 258671,
    Counts: { recognized: 231319, unrecognized: 27352 },
    skipDrawing: true,
  },
];

const baseDataPoint = {
  Country: "United States",
  Total: 258671,
  Counts: { recognized: 231319, unrecognized: 27352 },
  helpText: "# of entries from US",
};
