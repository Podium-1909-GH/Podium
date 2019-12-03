import * as d3 from 'd3'
import history from '../history'
import {formatSeconds} from '../utils'

const MARGIN = {TOP: 10, BOTTOM: 45, LEFT: 45, RIGHT: 10}
const WIDTH = 620 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
  // put things that only need to be called once in constructor
  constructor(element, speeches) {
    const vis = this
    // the visualization instance, calling it vis to define what this is
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g') // append svg group element onto svg canvas
      // add 10 pixel margin on left and top
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // add x-axis label
    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 30)
      .attr('text-anchor', 'middle')
      .text(`Your last ${speeches.length} sessions`)

    // add y-axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .text('Words Per Minute')
      .attr('transform', 'rotate(-90)')

    // want to define x and y axis once originally
    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`)
    // append empty group for axis gen to be called on to get both axes to show
    // use transform attr and translate attr to put x axis on bottom instead of top

    vis.yAxisGroup = vis.svg.append('g')

    // load two different data sets at once
    vis.data = speeches

    // d3.max loops through data array and finds max height
    const maxY = d3.max(vis.data, d => d.wpm)
    const minY = d3.min(vis.data, d => d.wpm)
    const y = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minY * 0.95, maxY])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([HEIGHT, 0]) // put height as min to get y axis to start at bottom left

    const maxX = d3.max(vis.data, d => d.index)
    const minX = d3.min(vis.data, d => d.index)
    let ticks = speeches.map(speech => speech.index)
    const x = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minX, maxX])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([0, WIDTH])

    // updates x axis, passing in x scale
    let tickFormat = d3.format('d')
    const xAxisCall = d3
      .axisBottom(x)
      .tickValues(ticks)
      .tickFormat(d => tickFormat(d))
    // to call or recalculate axis, need to use call method
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall)

    // updates y axis
    const yAxisCall = d3.axisLeft(y)
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

    vis.svg
      .append('path')
      .datum(vis.data)
      .attr('fill', 'none')
      .attr('stroke', '#E445A8')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line()
          .x(function(d) {
            return x(d.index)
          })
          .y(function(d) {
            return y(d.wpm)
          })
      )

    let format = d3.timeFormat('%b %e')
    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1)
      d3
        .select(this)
        .attr('r', 7)
        .style('stroke', '#4652B1')
        .style('opacity', 1)
    }
    let mousemove = function(d) {
      vis.Tooltip.html(
        `
        ${format(d3.isoParse(d.createdAt))}<br>${formatSeconds(d.length)}`
      )
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

    // Add the points
    vis.svg
      .append('g')
      .selectAll('dot')
      .data(vis.data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        return x(d.index)
      })
      .attr('cy', function(d) {
        return y(d.wpm)
      })
      .attr('r', 5)
      .attr('fill', '#E445A8')
      .style('stroke-width', 3)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .on('click', d => history.push(`/user/speeches/${d.id}/overview`))

    // once load data, our graph gets updated by update method every 1000 ms
  }

  // update method gets called every time we update our data

  // for updating chart based on dropdown menu
}
