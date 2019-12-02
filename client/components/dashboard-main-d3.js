import * as d3 from 'd3'
import history from '../history'
import {formatSeconds} from '../../utils'

const MARGIN = {TOP: 10, BOTTOM: 10, LEFT: 10, RIGHT: 10}
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM

export default class DashBoardMainD3 {
  constructor(element, speeches) {
    const vis = this

    const data = speeches

    const lengths = []
    for (let i = 0; i < speeches.length; i++) {
      lengths.push(speeches[i].length)
    }

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.index))
      .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
      .padding(0.4)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.length / 60)])
      .nice()
      .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])

    const xAxis = g =>
      g
        .attr('transform', `translate(0,${HEIGHT - MARGIN.BOTTOM})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))

    const yAxis = g =>
      g
        .attr('transform', `translate(${MARGIN.LEFT},0)`)
        .call(d3.axisLeft(y))
        // eslint-disable-next-line no-shadow
        .call(g => g.select('.domain').remove())

    vis.Tooltip = d3
      .select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '3px')
      .style('width', 'fit-content')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('font-size', '80%')
      .style('position', 'absolute')

    let format = d3.timeFormat('%b %e')
    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1)
      d3
        .select(this)
        .style('stroke', 'black')
        .style('opacity', 0.8)
    }
    let mousemove = function(d) {
      vis.Tooltip.html(
        `
          ${format(d3.isoParse(d.createdAt))}<br>${formatSeconds(
          d.length
        )}<br>${d.transcript.split(' ').length} words`
      )
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY + 'px')
    }

    let mouseleave = function(d) {
      vis.Tooltip.style('opacity', 0)
      d3
        .select(this)
        .style('stroke', 'none')
        .style('opacity', 1)
    }

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(zoom)

    vis.svg
      .append('svg')
      .attr('class', 'bars')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.index))
      .attr('y', d => y(d.length / 60))
      .attr('height', d => y(0) - y(d.length / 60))
      .attr('width', x.bandwidth())
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .on('click', d => history.push(`/user/speeches/${d.id}/overview`))

    vis.svg
      .append('g')
      .attr('class', 'x-axis')
      .call(xAxis)

    function zoom(svg) {
      const extent = [
        [MARGIN.LEFT, MARGIN.TOP],
        [WIDTH - MARGIN.RIGHT, HEIGHT - MARGIN.TOP]
      ]

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 3])
          .translateExtent(extent)
          .extent(extent)
          .on('zoom', zoomed)
      )

      function zoomed() {
        x.range(
          [MARGIN.LEFT, WIDTH - MARGIN.RIGHT].map(d =>
            d3.event.transform.applyX(d)
          )
        )
        svg
          .selectAll('.bars rect')
          .attr('x', d => x(d.index))
          .attr('width', x.bandwidth())
        svg.selectAll('.x-axis').call(xAxis)
      }
    }

    // to add axis titles:

    // vis.svg
    //   .append('text')
    //   .attr('x', WIDTH / 2)
    //   .attr('y', HEIGHT + 50)
    //   .attr('text-anchor', 'middle')
    // .text('Your sessions')

    // vis.svg
    //   .append('text')
    //   .attr('x', -(HEIGHT / 2))
    //   .attr('y', -50)
    //   .attr('text-anchor', 'middle')
    //   .text('Total Minutes')
    //   .attr('transform', 'rotate(-90)')

    // vis.xAxisGroup = vis.svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${HEIGHT})`)

    // vis.yAxisGroup = vis.svg.append('g')
  }
}
