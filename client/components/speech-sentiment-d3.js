import * as d3 from 'd3'

const MARGIN = {TOP: 50, BOTTOM: 50, LEFT: 150, RIGHT: 100}
const WIDTH = 400 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 250 - MARGIN.TOP - MARGIN.BOTTOM
const RADIUS = 150
export default class D3SentimentChart {
  constructor(element, filterSentimentData) {
    const totalWordsCount = filterSentimentData.reduce(
      (accum, data) => accum + data.count,
      0
    )
    filterSentimentData.forEach(data => {
      data.percentage = Math.round(data.count * 100 / totalWordsCount)
    })

    const vis = this

    //Create SVG canvas
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + RADIUS + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + RADIUS + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr(
        'transform',
        `translate(${RADIUS + MARGIN.LEFT}, ${RADIUS + MARGIN.TOP})`
      )

    //Create pie generator getting startAngle and endAngle
    const pieGenerator = d3
      .pie()
      .value(function(d) {
        return d.count //caculate angle base on count
      })
      .sort((a, b) => {
        return a.name < b.name
      })

    // Create an arc generator with configuration
    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(RADIUS)

    //labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(RADIUS * 0.8)
      .outerRadius(RADIUS * 0.8)

    // set the color scale
    const myColor = d3.scaleOrdinal(['#2ca02c', '#ff7f0e', '#c7c7c7'])

    //connect Data
    const arcData = pieGenerator(filterSentimentData)
    console.log(arcData)

    // Build the pie chart: Create a path element and set its d attribute
    vis.svg
      .selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => myColor(i))
      .attr('stroke', 'white')
      .style('stroke-width', '1px')
      .style('opacity', 0.7)

    // Add the polylines between chart and labels:
    vis.svg
      .selectAll('allPolylines')
      .data(arcData)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1.3)
      .attr('points', function(d) {
        var pos = outerArc.centroid(d)
        // multiply by 1 or -1 to put it on the right or on the left
        pos[0] =
          RADIUS *
          0.95 *
          (d.data.name === 'Neutral' || d.data.name === 'Negative' ? 1 : -1)
        //Create line insertion, line break and label position in the slice
        return [arcGenerator.centroid(d), outerArc.centroid(d), pos]
      })

    // Labels
    vis.svg
      .selectAll('allLabels')
      .data(arcData)
      .enter()
      .append('text')
      .each(function(d) {
        d3
          .select(this)
          .attr('dy', '0.33em')
          .text(d.data.name)
          .attr('font-size', '0.90em')
          .transition()
          .duration(1000)
          .attrTween('transform', function(d) {
            this._current = this._current || d
            var interpolate = d3.interpolate(this._current, d)
            this._current = interpolate(0)
            return function(t) {
              var d2 = interpolate(t)
              var pos = outerArc.centroid(d2)
              pos[0] =
                RADIUS *
                (d.data.name === 'Neutral' || d.data.name === 'Negative'
                  ? 1
                  : -1)
              return 'translate(' + pos + ')'
            }
          })
          .styleTween('text-anchor', function(d) {
            this._current = this._current || d
            var interpolate = d3.interpolate(this._current, d)
            this._current = interpolate(0)
            return function(t) {
              var d2 = interpolate(t)
              return d.data.name === 'Neutral' || d.data.name === 'Negative'
                ? 'start'
                : 'end'
            }
          })
      })
    // we need the angle to see if the X position will be at the extreme right or extreme left
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2
    }

    //Percentage outside Pie Chart- example from https://bl.ocks.org/farazshuja/e2cb52828c080ba85da5458e2304a61f?fbclid=IwAR1We_VcLDjFBre6Fv60rT3OtHIEVdmTttkh7KG0ZHRrfzLBIcHIgV1QUYQ
    vis.svg
      .selectAll('.arc')
      .data(arcData)
      .enter()
      .append('text')
      .attr('transform', function(d) {
        var _d = arcGenerator.centroid(d)
        _d[0] *= 2.2 //multiply by a constant factor
        _d[1] *= 2.2 //multiply by a constant factor
        return 'translate(' + _d + ')'
      })
      .attr('dy', '.50em')
      .style('text-anchor', 'middle')
      .text(function(d) {
        return d.data.percentage + '%'
      })

    vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Sentiment')
  }
}
