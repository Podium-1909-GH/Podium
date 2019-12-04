import * as d3 from 'd3'

const MARGIN = {TOP: 50, BOTTOM: 50, LEFT: 150, RIGHT: 100}
const WIDTH = 400 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM
const RADIUS = 150
export default class D3SentimentChart {
  constructor(element, filterSentimentData) {
    const totalWordsCount = filterSentimentData.reduce(
      (accum, data) => accum + data.count,
      0
    )
    filterSentimentData.forEach(data => {
      data.percentage = Math.round(data.count * 100 / totalWordsCount)

      // set the color scale
      if (data.name === 'Positive') {
        data.color = '#2ECC71'
      } else if (data.name === 'Negative') {
        data.color = '#E67E22'
      } else {
        data.color = '#D6EAF8'
      }
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
    const pieGenerator = d3
      .pie()
      .value(function(d) {
        return d.count //caculate angle base on count
      })
      .sort((a, b) => {
        return a.name < b.name
      })

    // Create an arc generator with configuration
    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(RADIUS)

    //connect Data
    const arcData = pieGenerator(filterSentimentData)
    console.log(arcData)

    // Build the pie chart: Create a path element and set its d attribute
    vis.svg
      .selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .style('stroke-width', '0.5px')
      .style('opacity', 0.7)

    //Percentage outside Pie Chart- example from https://bl.ocks.org/farazshuja/e2cb52828c080ba85da5458e2304a61f?fbclid=IwAR1We_VcLDjFBre6Fv60rT3OtHIEVdmTttkh7KG0ZHRrfzLBIcHIgV1QUYQ
    vis.svg
      .selectAll('.arc')
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

    //header
    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Sentiment Ratios')
  }
}
