var country = new URLSearchParams(window.location.search).get('country')
var origin = new URLSearchParams(window.location.search).get('from')
var url = "http://api.euroflask.com/population?country=" + country
if(origin != null) {
  url += "&from=" + origin
}

origin = origin || "TOTAL"

d3.json(url).then(function(data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scaleTime()
      .rangeRound([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  var parseTime = d3.timeParse("%Y");
  var line = d3.line()
      .defined(function(d) { return d.population; })
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.population); });

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  console.log(data)
  keys = Object.keys(data[origin])
  processedData = []
  keys.forEach(function(key) {
    o = Object()
    o.date = parseTime(key)
    o.population = data[origin][key]
    processedData.push(o)
  })

  data = processedData;

  console.log(data)


  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.population; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

  // Add the X Axis
  var g = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  var svg_aline = g.append("line")
    .attr("class", "line")	
    .style("stroke-dasharray", ("3, 10"))	
    .attr("x1",100)
    .attr("x2",400)
    .attr("y1",200)
    .attr("y2",200)
    .style("display", "None")

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.selectAll(".dot")
  .data(data.filter(function(d) { return d; }))
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", line.x())
    .attr("cy", line.y())
    .attr("r", 4)
    .style("fill", "grey")
    .on("mouseover", function(d) {	
      d3.select(this).transition().duration(100)
        .style("fill", "black")
        .attr("r", 8);
      div.transition()		
          .duration(200)		
          .style("opacity", .8);		
      div.html(d.date.getFullYear() + " population: " + d.population)
          .style("left", x(d.date) + "px")		
          .style("top", y(d.population) + "px");	
      svg_aline.transition().duration(10)
        .style("display", "block")
        .attr("x1", x(d.date))
        .attr("y1", y(d.population))
        .attr("x2", x(d.date))
        .attr("y2", height)
    })		
    .on("mouseout", function(d) {	
      d3.select(this).transition().duration(100)
        .style("fill", "grey")
        .attr("r", 4);
      div.transition()		
          .duration(500)		
          .style("opacity", 0);	
      svg_aline.style("display","None")
    });
});
