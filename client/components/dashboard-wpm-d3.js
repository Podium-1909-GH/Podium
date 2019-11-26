import * as d3 from 'd3'

const MARGIN = {TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10}
const WIDTH = 700 - MARGIN.LEFT - MARGIN.RIGHT
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
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text("The world's tallest men")

    // add y-axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Height in cm')
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

    vis.draw()
    // once load data, our graph gets updated by update method every 1000 ms
  }

  // update method gets called every time we update our data
  draw() {
    const vis = this

    // for updating chart based on dropdown menu
    vis.xLabel.text(`Your words per minute`)

    // d3.max loops through data array and finds max height
    const maxY = d3.max(vis.data, d => d.wpm)
    const minY = d3.min(vis.data, d => d.wpm)
    const y = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minY * 0.95, maxY])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([HEIGHT, 0]) // put height as min to get y axis to start at bottom left
    // console.log(y(272)) pass in 272 cm, returns 500 pixels

    const maxX = d3.max(vis.data, d => d.index)
    const minX = d3.min(vis.data, d => d.index)
    const x = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minX * 0.95, maxX])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([0, WIDTH])
      .padding(0.4) // put height as min to get y axis to start at bottom left
    // console.log(y(272)) pass in 272 cm, returns 500 pixels

    // updates x axis, passing in x scale
    const xAxisCall = d3.axisBottom(x)
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

    vis
      .append('path')
      .datum(vis.data)
      .attr('fill', 'none')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5)
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
    // Add the points
    vis
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
      .attr('fill', '#69b3a2')
  }
}
