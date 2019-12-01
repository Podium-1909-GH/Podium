import * as d3 from 'd3'

const MARGIN = {TOP: 20, BOTTOM: 20, LEFT: 200, RIGHT: 70}
const RADIUS = 150
const WIDTH = 650
const HEIGHT = 650
export default class D3SpeechSentimentChart {
  constructor(element, sentiment) {
    console.log(sentiment)
    const vis = this

    //Create SVG canvas
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + RADIUS + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + RADIUS + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr(
        'transform',
        `translate(${RADIUS + MARGIN.LEFT}, ${RADIUS + MARGIN.TOP})`
      )

    //Create pie generator getting startAngle and endAngle
    const pieGenerator = d3.pie().value(function(d) {
      return d.count
    })

    // Create an arc generator with configuration
    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(RADIUS)

    let sentimentData = [
      {name: 'Positive', count: sentiment.positive.length},
      {name: 'Negative', count: sentiment.negative.length},
      {
        name: 'Neutral',
        count:
          sentiment.tokens.length -
          sentiment.positive.length -
          sentiment.negative.length
      }
    ]

    const filterSentimentData = sentimentData.filter(data => data.count > 0)

    const myColor = d3.scaleOrdinal(['#2ca02c', '#ff7f0e', '#c7c7c7'])

    const arcData = pieGenerator(filterSentimentData)

    // Create a path element and set its d attribute
    vis.svg
      .selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => myColor(i))

    // Labels
    d3
      .select('g')
      .selectAll('text')
      .data(arcData)
      .enter()
      .append('text')
      .each(function(d) {
        var centroid = arcGenerator.centroid(d)
        d3
          .select(this)
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('dy', '0.33em')
          .text(d.data.name)
      })
  }
}
