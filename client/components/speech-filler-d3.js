import * as d3 from 'd3'

// const data = [
//   {height: "272", name: "Robert Wadlow"},
//   {height: "267", name: "John Rogan"},
//   {height: "263.5", name: "John Carroll"},
//   {height: "257", name: "Leonid Stadnyk"},
//   {height: "251.4", name: "Vaino Myllyrinne"},
// ]

// const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
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
      .append('g') // append svg group element onto svg canvas
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

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

    // get data from fillerObj, which will be an obj with keys that are words
    // and values of the frequency of the word
    vis.dataObj = Object.keys(fillerObj).reduce((accum, word) => {
      if (fillerObj[word].length > 0) {
        if (!accum[word]) {
          accum[word] = fillerObj[word].length
        }
      }
      return accum
    }, {})

    vis.dataWordsArr = Object.keys(dataObj)
    const minCount = Math.min(...Object.values(vis.dataObj))
    const maxCount = Math.max(...Object.values(vis.dataObj))

    // update method gets called every time we update our data
    // update(gender) {
    // const vis = this;

    // for updating chart based on dropdown menu
    // vis.data = (gender == "men") ? vis.menData : vis.womenData;
    // vis.xLabel.text(`The world's tallest ${gender}`)

    // d3.max loops through data array and finds max height
    // const max = d3.max(vis.dataArr, d => d.height);

    // const min = d3.min(vis.data, d => d.height);

    const y = d3
      .scaleLinear()
      // domain takes an array with 2 elems, min and max input units
      .domain([minCount * 0.95, maxCount])
      // range takes arr of 2 elems, min and max outputs in pixels
      .range([HEIGHT, 0]) // put height as min to get y axis to start at bottom left
    // console.log(y(272)) pass in 272 cm, returns 500 pixels

    const x = d3
      .scaleBand()
      .domain(vis.data.map(d => d.name))
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

    // DATA JOIN - which arr of data we want to associate with shapes
    // when want to add more than one data elem to screen at once do selectAll
    const rects = vis.svg.selectAll('rect').data(vis.data)

    // EXIT - removes any els in screen that aren't in array
    rects
      .exit()
      .attr('height', 0)
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .remove()

    // UPDATE - updates attr of rects that are both in arr and screen
    rects
      .transition()
      .duration(500)
      .attr('x', d => x(d.name))
      // move bars to start at x axis (instead of top left), have y val that's different for each el in array, return screen height - conversion of each el's height to pixels
      .attr('y', d => y(d.height))
      .attr('width', x.bandwidth)
      .attr('height', d => HEIGHT - y(d.height)) // make sure height 270 cm / pixels here fits in height svg 500

    // ENTER - append rects and set attr for elems in arr but not on screen
    // enter and append add ever item in data to our screen
    rects
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('width', x.bandwidth)
      .attr('fill', 'grey')
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('height', d => HEIGHT - y(d.height))
      .attr('y', d => y(d.height))

    // console.log(rects);
    // }
  }
}
