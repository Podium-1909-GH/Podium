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

    // GET DATA FROM FILLEROBJ
    // data is an arra of objs with 2 keys, word and count

    console.log('FILLEROBJ', fillerObj)

    vis.data = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        accum.push({word, count: fillerObj[word].length})
      }
      return accum
    }, [])
    console.log('vis.data', vis.data)

    // obj with keys as words, and vals as count
    vis.dataObj = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        if (!accum[word]) {
          accum[word] = fillerObj[word].length
        }
      }
      return accum
    }, {})
    console.log('vis.dataObj', vis.dataObj)

    vis.dataWordsArr = Object.keys(vis.dataObj)
    const minCount = Math.min(...Object.values(vis.dataObj))
    console.log('min', minCount)
    console.log('max', maxCount)
    const maxCount = Math.max(...Object.values(vis.dataObj))

    // add x-axis label
    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Filler Words')

    // add y-axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Total number of times used')
      .attr('transform', 'rotate(-90)')

    // want to define x and y axis once originally
    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`)
    // append empty group for axis gen to be called on to get both axes to show
    // use transform attr and translate attr to put x axis on bottom instead of top

    vis.yAxisGroup = vis.svg.append('g')

    const y = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minCount * 0.95, maxCount])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([HEIGHT, 0]) // put height as min to get y axis to start at bottom left
    // console.log(y(272)) pass in 272 cm, returns 500 pixels

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.word))
      .range([0, WIDTH])
      .padding(0.4)

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

    const rects = vis.svg.selectAll('rect').data(vis.data)

    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.word))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.count))
      .attr('fill', 'grey')

    console.log('RECTS', rects)
  }
}
