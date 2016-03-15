var data = [
  {
    "Percent":"100",
    "gender":"Male", 
    "color":"blue"
  }, 
  {
    "Percent":"50",
    "gender":"Female", 
    "color":"red"
  }, 
  {
    "Percent":"60",
    "gender":"Male",
    "color":"red"
  },
  {
    "Percent":"40",
    "gender":"Female", 
    "color":"red"
  },
  {
    "Percent":"90",
    "gender":"Male",
    "color":"red"
  },
  {
    "Percent":"20",
    "gender":"Female", 
    "color":"red"
  }
];

var margin = {top: 60, right: 40, bottom: 50, left: 50},
    width = 600,
    height = 320 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return +d.Percent;})])
  .range([0, width - margin.left - margin.right]); 
  

var y = d3.scale.ordinal()
  .domain(data.map(function(d) {return d.gender;}))
  .rangeBands([0, height - margin.top - margin.bottom]); /// is this right?

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickPadding(6);
    
var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(1)
  .tickSize(0)
  .tickPadding(6);
    
var svg = d3.select('#bar')
  .append('svg')
  .attr('class', 'chart')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
  
  svg.append('g')
    .attr('class', 'x-axis axis')
    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
    .call(xAxis)
  
  svg.append('g')
    .attr('class', 'y-axis axis')
    .call(yAxis)

  svg.selectAll('.chart')
    .data(data)
    // .data(data[0][1])
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', 1)
    .attr('y', function(d,i){return -1 + margin.top + y.rangeBand() * i - margin.top;})
    .attr('height', 40)
    .attr('width', function(d) { return x(d.Percent) })
    .attr('fill', function(d) { return d.color }) //changed to d.color from x(d.color) as you don't need to transform the color value

  svg.append("text")
    .attr("x", (width / 2 - margin.left))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "left")