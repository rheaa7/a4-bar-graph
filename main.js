var data = [
  [{
    "Percent": "100",
    "gender":"Male", 
    "color":"#00D0FE"
  }, 
  {
    "Percent": "50",
    "gender":"Female", 
    "color":"#EA83DB"
  }], 
  [{
    "Percent": "60",
    "gender":"Male",
    "color":"#00D0FE"
  },
  {
    "Percent":"40",
    "gender":"Female", 
    "color":"#EA83DB"
  }],
  [{
    "Percent":"90",
    "gender":"Male",
    "color":"#00D0FE"
  },
  {
    "Percent":"20",
    "gender":"Female", 
    "color":"#EA83DB"
  }]
];

var margin = {top: 60, right: 40, bottom: 50, left: 50},
    width = 600,
    height = 320 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .domain([0,100])
  .range([0, width - margin.left - margin.right]); 
 

var y = d3.scale.ordinal()
  .domain(data[0].map(function(d) { return d.gender;} ))
  .rangeBands([0, height - margin.top - margin.bottom]); 

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(10)
    .orient("bottom")
    .tickPadding(6);
    
var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(1)
  .tickSize(1)
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
 
    
update(data[0]); // update(data[1]);
    
function update(data) {
    //x.domain([0, d3.max(data, function(d) { return +d.Percent;})])
    
    svg.select('.x-axis').call(xAxis)
    
    var text = svg.selectAll(".text")
        .data(data)
    
    text.text(function(d) {return d.Percent})
        .attr('x', function(d) { return x(d.Percent)});
    
    text.enter().append("text")
        .attr('class', 'text')
        .text(function(d) {
            return (d.Percent);
        })
        .attr('x', function(d) { return x(d.Percent)})
        .attr('y', function(d, i ){ return y.rangeBand() * i + 26; })
        
    var bar = svg.selectAll('.bar')
        .data(data)
        
    //updating bars
    bar.attr('y', function(d,i) { return y.rangeBand() * i; })
        .transition()
        .duration(100)
        .ease("linear")
        .attr('width', function(d) { return x(d.Percent) })
        .attr('fill', function(d) { return d.color })  
        
        
      

    //creating bars
    bar.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', 1)
        .attr('y', function(d, i ){ return y.rangeBand() * i; })
        .attr('height', 40)
        .attr('width', function(d) { return x(d.Percent) })
        .attr('fill', function(d) { return d.color })  
        //transition
        .transition()
        .duration(100)
        .ease("linear")
    
    bar.exit().remove();
   
}