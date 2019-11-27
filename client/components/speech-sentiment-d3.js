import * as d3 from 'd3'

const MARGIN = {TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10}
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM
export default class D3SpeechSentimentChart {
  constructor(element, sentiment) {
    const vis = this

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width')
      .attr('height')
      .append('g')
      .attr('transform', 'translate(' + WIDTH / 2 + ',' + HEIGHT / 2 + ')')

    vis.radius = Math.min(WIDTH, HEIGHT) / 2
    vis.color = d3.scaleOrdinal([
      '#4daf4a',
      '#377eb8',
      '#ff7f00',
      '#984ea3',
      '#e41a1c'
    ])

    // load two different data sets at once
    vis.data = sentiment

    vis.pie = d3.pie().value(function(d) {
      return d.percent
    })

    vis.path = d3
      .arc()
      .outerRadius(vis.radius - 10)
      .innerRadius(0)

    vis.label = d3
      .arc()
      .outerRadius(vis.radius)
      .innerRadius(vis.radius - 80)

    d3.csv('browseruse.csv', function(error, data) {
      if (error) {
        throw error
      }
      var arc = g
        .selectAll('.arc')
        .data(vis.pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

      arc
        .append('path')
        // eslint-disable-next-line no-undef
        .attr('d', path)
        .attr('fill', function(d) {
          return vis.color(d.data.browser)
        })

      console.log(arc)

      arc
        .append('text')
        .attr('transform', function(d) {
          return 'translate(' + vis.label.centroid(d) + ')'
        })
        .text(function(d) {
          return d.data.browser
        })
    })

    vis.svg
      .append('g')
      .attr('transform', 'translate(' + (WIDTH / 2 - 120) + ',' + 20 + ')')
      .append('text')
      .text('Browser use statistics - Jan 2017')
      .attr('class', 'title')
  }
}
