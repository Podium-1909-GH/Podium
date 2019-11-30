import * as d3 from 'd3'
import history from '../history'

const svgWidth = 800
const svgHeight = 300
const radius = 80

export default class D3Bubbles {
  // put things that only need to be called once in constructor
  constructor(element, speech) {
    console.log('speech: ', speech)
    const vis = this
    let sentiment = ''
    const sentimentParsed = JSON.parse(speech.sentiment)
    if (sentimentParsed.comparative > 0.01) {
      sentiment = 'positive'
    } else if (sentimentParsed.comparative < -0.01) {
      sentiment = 'negative'
    } else {
      sentiment = 'neutral'
    }

    // the visualization instance, calling it vis to define what this is
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    //make the circle
    vis.svg
      .append('circle')
      .attr('cx', svgWidth / 6)
      .attr('cy', svgHeight / 2)
      .attr('r', radius)
      .attr('fill', 'grey')
    //add text
    vis.svg
      .append('text')
      .attr('x', svgWidth / 6)
      .attr('y', svgHeight / 2)
      .attr('text-anchor', 'middle')
      .text(`${speech.wpm}`)
      .attr('font-size', '50px')
      .attr('fill', 'white')
    //add text label
    vis.svg
      .append('text')
      .attr('x', svgWidth / 6)
      .attr('y', svgHeight / 2 + radius / 4)
      .attr('text-anchor', 'middle')
      .text(`words per minute`)
      .attr('font-size', '15px')
      .attr('fill', 'white')

    //make the circle
    vis.svg
      .append('circle')
      .attr('cx', svgWidth / 2)
      .attr('cy', svgHeight / 2)
      .attr('r', 80)
      .attr('fill', 'grey')
    //add text
    vis.svg
      .append('text')
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight / 2)
      .attr('text-anchor', 'middle')
      .text(`${speech.numberFiller}`)
      .attr('font-size', '50px')
      .attr('fill', 'white')
    //add text label
    vis.svg
      .append('text')
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight / 2 + radius / 4)
      .attr('text-anchor', 'middle')
      .text(`filler words`)
      .attr('font-size', '15px')
      .attr('fill', 'white')

    //make the circle
    vis.svg
      .append('circle')
      .attr('cx', svgWidth * 5 / 6)
      .attr('cy', svgHeight / 2)
      .attr('r', 80)
      .attr('fill', 'grey')
    //add text
    vis.svg
      .append('text')
      .attr('x', svgWidth * 5 / 6)
      .attr('y', svgHeight / 2)
      .attr('text-anchor', 'middle')
      .text(`${sentiment}`)
      .attr('font-size', '40px')
      .attr('fill', 'white')
    //add text label
    vis.svg
      .append('text')
      .attr('x', svgWidth * 5 / 6)
      .attr('y', svgHeight / 2 + radius / 4)
      .attr('text-anchor', 'middle')
      .text(`sentiment`)
      .attr('font-size', '15px')
      .attr('fill', 'white')
  }
}
