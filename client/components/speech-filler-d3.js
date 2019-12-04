import * as d3 from 'd3'

const MARGIN = {TOP: 10, BOTTOM: 45, LEFT: 45, RIGHT: 10}
const WIDTH = 620 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
  constructor(element, fillerObj) {
    const vis = this

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    vis.data = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        accum.push({word, count: fillerObj[word].length})
      }
      return accum
    }, [])

    vis.dataObj = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        if (!accum[word]) {
          accum[word] = fillerObj[word].length
        }
      }
      return accum
    }, {})

    const dataCountArr = Object.values(vis.dataObj)
    const maxCount = Math.max(...dataCountArr)
    const yAxisMinHeight = maxCount < 3 ? 3 : maxCount

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 35)
      .attr('text-anchor', 'middle')
      .text('Filler Words')

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .text('Total Number of Times Used')
      .attr('transform', 'rotate(-90)')

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`)

    vis.yAxisGroup = vis.svg.append('g')

    const y = d3
      .scaleLinear()
      // .domain([minCount * 0.95, maxCount])
      .domain([0, yAxisMinHeight])
      .range([HEIGHT, 0])

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.word))
      .range([0, WIDTH])
      .padding(0.4)

    const xAxisCall = d3.axisBottom(x)

    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall)

    let ticks = []
    for (let i = 0; i <= yAxisMinHeight; i++) {
      ticks.push(i)
    }

    const yAxisCall = d3
      .axisLeft(y)
      .tickValues(ticks)
      .tickFormat(d3.format('d'))

    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall)

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
        .attr('r', 7)
        .style('stroke', '#4652B1')
        .style('opacity', 1)
    }
    let mousemove = function(d) {
      vis.Tooltip.html(`Count: ${d.count}`)
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY + 'px')
    }

    let mouseleave = function(d) {
      vis.Tooltip.style('opacity', 0)
      d3
        .select(this)
        .attr('r', 5)
        .style('stroke', 'none')
        .style('opacity', 0.8)
    }

    const rects = vis.svg.selectAll('rect').data(vis.data)

    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.word))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.count))
      .attr('fill', '#11C3D0')
      .style('stroke-width', 3)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
  }
}
