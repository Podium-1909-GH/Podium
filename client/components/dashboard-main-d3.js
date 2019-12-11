import * as d3 from 'd3'
import history from '../history'
import {formatSeconds} from '../utils'

// Utilize D3 margin convention to set margin, width and height of canvas
const MARGIN = {TOP: 10, BOTTOM: 10, LEFT: 0, RIGHT: 20}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM

// Create D3 chart class
export default class DashBoardMainD3 {
  constructor(element, speeches) {
    // Set this context to equal a variable for the visualization
    const vis = this

    // Get relevant speech data passed to chart instance in React component
    const data = speeches

    const lengths = []
    for (let i = 0; i < speeches.length; i++) {
      lengths.push(speeches[i].length)
    }

    // Populate and scale x axis with numbering for each speech in user history
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.index))
      .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
      .padding(0.4)

    // Populate and scale y axis
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

    // Create and style tool tips that user sees when interact with each bar
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

    let format = d3.timeFormat('%b %e')
    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1)
      d3
        .select(this)
        .style('fill-opacity', 0.8)
        .style('stroke-width', 3)
        .style('stroke-linejoin', 'round')
        .style('stroke', '#4652B1')
        .style('stroke-opacity', 1)
    }
    let mousemove = function(d) {
      // user formatSeconds helper function to turn minutes to seconds
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
        .style('fill-opacity', 1)
    }

    // Define D3 canvas and specific size attributes
    // Call zoom function to enable zoom or scroll functionality
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(zoom)

    // Set attributes for tool tips user can interact with for each bar
    vis.svg
      .append('svg')
      .attr('class', 'bars')
      .attr('fill', '#4652B1')
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

    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 20)
      .attr('text-anchor', 'middle')

    // Create zoom functionality for user to zoom and scroll in bar chart
    function zoom(svg) {
      // Set maximum amount or range that the user can zoom
      const extent = [
        [MARGIN.LEFT, MARGIN.TOP],
        [WIDTH - MARGIN.RIGHT, HEIGHT - MARGIN.TOP]
      ]

      // Invoke helper zoomed function with extent scale when user zooms
      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 3])
          .translateExtent(extent)
          .extent(extent)
          .on('zoom', zoomed) // zoom listener
      )

      // Create zoom transformation on each data point or bar in x axis
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
  }
}
