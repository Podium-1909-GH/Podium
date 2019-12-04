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
        data.color = '#11C3D0'
      } else if (data.name === 'Negative') {
        data.color = '#E445A8'
      } else {
        data.color = '#4652B1'
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
    vis.Tooltip = d3
      .select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('color', '#4652B1')
      .style('border', 'solid')
      .style('border-color', '#4652B1')
      .style('border-width', '3px')
      .style('border-radius', '3px')
      .style('width', 'fit-content')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('font-size', '80%')
      .style('position', 'absolute')
    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1)
      d3
        .select(this)
        .style('stroke', '#4652B1')
        .style('stroke-width', 3)
        .style('opacity', 1)
    }
    let mousemove = function(d) {
      vis.Tooltip.html(`${d.data.name} Count: ${d.data.count}`)
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY + 'px')
    }

    let mouseleave = function(d) {
      vis.Tooltip.style('opacity', 0)
      d3
        .select(this)
        .style('stroke', 'white')
        .style('stroke-width', 1)
        .style('opacity', 0.8)
    }
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
      .innerRadius(70)
      .outerRadius(RADIUS)

    //connect Data
    const arcData = pieGenerator(filterSentimentData)

    // Build the pie chart: Create a path element and set its d attribute
    vis.svg
      .selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .style('stroke-width', '1')
      .style('opacity', 0.7)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)

    //Percentage outside Pie Chart- example from https://bl.ocks.org/farazshuja/e2cb52828c080ba85da5458e2304a61f?fbclid=IwAR1We_VcLDjFBre6Fv60rT3OtHIEVdmTttkh7KG0ZHRrfzLBIcHIgV1QUYQ
    // vis.svg
    //   .selectAll('.arc')
    //   .data(arcData)
    //   .enter()
    //   .append('text')
    //   .attr('transform', function(d) {
    //     var _d = arcGenerator.centroid(d)
    //     _d[0] *= 1.7 //multiply by a constant factor
    //     _d[1] *= 1.7 //multiply by a constant factor
    //     return 'translate(' + _d + ')'
    //   })
    //   .attr('dy', '.50em')
    //   .style('text-anchor', 'middle')
    //   .text(function(d) {
    //     return d.data.percentage + '%'
    //   })

    //header
    // vis.svg
    //   .append('text')
    //   .attr('x', WIDTH / 2)
    //   .attr('y', HEIGHT + 40)
    //   .attr('text-anchor', 'middle')
    //   .text('Sentiment Ratios')
  }
}
