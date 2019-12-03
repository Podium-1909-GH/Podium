import * as d3 from 'd3'

const MARGIN = {TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

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
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Filler Words')

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
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

    const rects = vis.svg.selectAll('rect').data(vis.data)

    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.word))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.count))
      .attr('fill', '#4652B1')
  }
}
