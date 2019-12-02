import * as d3 from 'd3'

const MARGIN = {TOP: 50, BOTTOM: 50, LEFT: 150, RIGHT: 100}
const RADIUS = 150
const WIDTH = 400 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM
export default class D3SentimentChart {
  constructor(element, filterSentimentData) {
    console.log(filterSentimentData)

    const totalWordsCount = filterSentimentData.reduce(
      (accum, data) => accum + data.count,
      0
    )
    filterSentimentData.forEach(data => {
      data.percentage = Math.round(data.count * 100 / totalWordsCount)
    })

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
      return d.count //caculate angle base on count
    })

    // Create an arc generator with configuration
    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(RADIUS)

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
    vis.svg
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
          .attr('font-size', '0.8em')
      })

    vis.svg
      .selectAll('.arc') // example from https://bl.ocks.org/farazshuja/e2cb52828c080ba85da5458e2304a61f?fbclid=IwAR1We_VcLDjFBre6Fv60rT3OtHIEVdmTttkh7KG0ZHRrfzLBIcHIgV1QUYQ
      .data(arcData)
      .enter()
      .append('text')
      .attr('transform', function(d) {
        var _d = arcGenerator.centroid(d)
        _d[0] *= 2.2 //multiply by a constant factor
        _d[1] *= 2.2 //multiply by a constant factor
        return 'translate(' + _d + ')'
      })
      .attr('dy', '.50em')
      .style('text-anchor', 'middle')
      .text(function(d) {
        return d.data.percentage + '%'
      })

    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Sentiment')
  }
}
