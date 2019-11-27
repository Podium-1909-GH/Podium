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
    console.log('fillerObj in D3', fillerObj)

    vis.data = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        accum.push({word, count: fillerObj[word].length})
      }
      return accum
    }, [])
    // console.log('vis.data', vis.data)

    // obj with keys as words, and vals as count
    vis.dataObj = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        if (!accum[word]) {
          accum[word] = fillerObj[word].length
        }
      }
      return accum
    }, {})
    // console.log('vis.dataObj', vis.dataObj)

    // const dataWordsArr = Object.keys(vis.dataObj)
    const dataCountArr = Object.values(vis.dataObj)
    // console.log('dataCountArr*****', dataCountArr)

    // const minCount = Math.min(...Object.values(vis.dataObj))
    const minCount = Math.min(...dataCountArr)
    console.log('min', minCount)

    // const maxCount = Math.max(...Object.values(vis.dataObj))
    const maxCount = Math.max(...dataCountArr)
    console.log('max', maxCount)

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('Filler Words')

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Total number of times used')
      .attr('transform', 'rotate(-90)')

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`)

    vis.yAxisGroup = vis.svg.append('g')

    const y = d3
      .scaleLinear()
      .domain([minCount * 0.95, maxCount])
      .range([HEIGHT, 0])

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.word))
      .range([0, WIDTH])
      .padding(0.4)

    const xAxisCall = d3.axisBottom(x)

    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall)

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
  }
}
