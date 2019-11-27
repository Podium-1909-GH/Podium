// import React from 'react';
// import * as d3 from 'd3';

// class D3SpeechSentimentChart extends React.Component {
//   constructor(element, sentimentObj) {
//     const svg = d3.select(element)
//      .append("svg")
//     const width = svg.attr("width")
//     const height = svg.attr("height")
//     const radius = Math.min(width, height) / 2;

//     const g = svg.append("g")
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     const color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

//     var pie = d3.pie().value(function (d) {
//       return d.percent;
//     });

//     var path = d3.arc()
//       .outerRadius(radius - 10)
//       .innerRadius(0);

//     var label = d3.arc()
//       .outerRadius(radius)
//       .innerRadius(radius - 80);

//     d3.csv("browseruse.csv", function (error, data) {
//       if (error) {
//         throw error;
//       }
//       var arc = g.selectAll(".arc")
//         .data(pie(data))
//         .enter().append("g")
//         .attr("class", "arc");

//       arc.append("path")
//         .attr("d", path)
//         .attr("fill", function (d) { return color(d.data.browser); });

//       console.log(arc)

//       arc.append("text")
//         .attr("transform", function (d) {
//           return "translate(" + label.centroid(d) + ")";
//         })
//         .text(function (d) { return d.data.browser; });
//     });

//     svg.append("g")
//       .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
//       .append("text")
//       .text("Browser use statistics - Jan 2017")
//       .attr("class", "title")
//   }

// };

// export default D3SpeechSentimentChart
