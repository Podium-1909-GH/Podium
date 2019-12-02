import * as d3 from 'd3'
import {formatSeconds} from '../../utils'

const MARGIN = {TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10}
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
  // put things that only need to be called once in constructor
  constructor(element, speech, wpmInfo) {
    const vis = this
    console.log('d3 speech', speech)
    // the visualization instance, calling it vis to define what this is
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g') // append svg group element onto svg canvas
      // add 10 pixel margin on left and top
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // // add x-axis label
    // vis.xLabel = vis.svg
    //   .append('text')
    //   .attr('x', WIDTH / 2)
    //   .attr('y', HEIGHT + 45)
    //   .attr('text-anchor', 'middle')
    //   .text(`Your last ${speeches.length} sessions`)

    // add y-axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
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
    vis.data = speech

    // d3.max loops through data array and finds max height

    const y = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([0, 100])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([HEIGHT, 0])
    // put height as min to get y axis to start at bottom left
    // console.log(y(272)) pass in 272 cm, returns 500 pixels

    const x = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([0, 600])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([0, WIDTH])

    // updates x axis, passing in x scale
    let tickFormat = d3.format('d')
    const xAxisCall = d3.axisBottom(x).tickFormat(d => tickFormat(d))
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
        .style('stroke', 'none')
        .style('opacity', 0.8)
    }

    // Add the points
    vis.svg
      .append('g')
      .selectAll('dot')
      .data([vis.data])
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        console.log('d', d)
        return x(d.wpm)
      })
      .attr('cy', function(d) {
        return y(50)
      })
      .attr('r', 5)
      .attr('fill', '#69b3a2')
      .style('stroke-width', 3)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
  }
}
