import * as d3 from 'd3'
import history from '../history'

export default class D3Bubbles {
  // put things that only need to be called once in constructor
  constructor(element, speeches) {
    const vis = this
    // the visualization instance, calling it vis to define what this is
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', 200)
      .attr('height', 200)

    //make the circle
    vis.svg
      .append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 60)
      .attr('fill', 'grey')

    //add text
    vis.svg
      .append('text')
      .attr('x', 50)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .text('wpm')
      .attr('font-size', '20px')
      .attr('fill', 'black')
  }
}
