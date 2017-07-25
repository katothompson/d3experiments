'use strict';

//console.log('d3experiments.js');
var myNumber = 5;
var myString = '55';
var myParsedNumber = +myString;
function log(){
  console.log(myNumber + myParsedNumber);
}

var myArrayOfObjects = [
  {x:10, y:200},
  {x:50, y:200},
  {x:90, y:200},
  {x:130, y:200},
  {x:170, y:200}
]

myArrayOfObjects.forEach(function(d){
  //console.log('x: ' + d.x + ', y: ' + d.y);
});

d3.csv("static/data.csv", function(myArrayOfObjects){
  myArrayOfObjects.forEach(function(d){
    //console.log(d.x + ', ' + d.y);
  });
});

d3.csv("static/data.csv", type, function(myArrayOfObjects){
  myArrayOfObjects.forEach(function(d){
    //console.log(d.x + d.y);
  })
})

function type(d){
  //d.x = parseFloat(d.x);
  //d.y = parseFloat(d.y);
  d.x = +d.x;
  d.y = +d.y;
  return d;
}

var scale = d3.scaleLinear()
  .domain([0,1]) //data space
  .range([0,100]) //pixel space

//console.log(scale(0.5)); //give it domain value, returns pixel value.

var fruitScale = d3.scaleOrdinal()
  .domain(['A', 'B', 'C'])
  .range(['Apple', 'Banana', 'Coconut']);

//console.log(fruitScale('B'));

var fruitScale = d3.scalePoint()
  .domain(["a", "b", "c", "d"])
  .range([0,100]);

//console.log(fruitScale('b'));

var svg = d3.select("body").append("svg")
  .attr('width', 600)
  .attr('height', 600);

var rect = svg.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 500)
  .attr('height', 500)
  .attr('fill', 'pink')
  .attr('stroke', 'darkgreen')
  .attr('stroke-width', 10);

var rect = svg.append('rect')
  .attr('x', 30)
  .attr('y', 30)
  .attr('width', 200)
  .attr('height', 200)
  .attr('fill', 'yellow');

//first, get data
var data = [1, 2, 3, 4, 5, 6, 7, 8];
// define type of scale and set domain and range.
var scale = d3.scaleLinear()
  .domain([1, 8]) //dataspace
  .range([50, 300]) //pixelspace

//next create svg element

var svg = d3.select('#newsvg').append('svg')
  .attr('width', 500)
  .attr('height', 250);

  var rect = svg.append('rect')
    .attr('class', 'myCirc')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 500)
    .attr('height', 250)
    .attr('fill', 'lightgrey')
    .attr('stroke', 'black')
    .attr('stroke-width', 5);

//next use data set to place circles on svg element

svg.selectAll('.myCirc')
    .data(data)
  .enter().append('circle')
    .attr('class', 'myCirc')
    .attr('onclick', 'log()')
    .attr('fill', 'yellow')
    .attr('r', 10)
    //.attr('cx', function(d){return scale(d);})
    .attr('cx', scale)
    .attr('cy', 100);
//notice that even though the data array has eight elements
//there are only seven yellow circles appended.
//This is because the grey rectangle has class myCirc, which is
//selected and assumed to correspond to first element in array.
//remove myCirc class from grey rectangle, and the first yellow circle appears.

//now for the complete render function

//create the svg element
var svg = d3.select('#render').append('svg')
  .attr('width', 400)
  .attr('height', 400);
//define the scale of the svg element
var scale2 = d3.scaleLinear()
  .domain([1, 10])    //data space
  .range([100, 300]); //pixel space

//create the render function

function render(array, color){
  //bind elements to data
  var rects = svg.selectAll('rect').data(array);

  //enter any new elements
  rects.enter().append('rect')
    .attr('width', 10)
    .attr('height', 20)
    .attr('x', scale2)
    .attr('y', 200)
    .attr('fill', color);

  //update all elements
  rects
    //.attr('x', scale2)
    //.attr('y', 200)
    .attr('stroke', color)
    .attr('stroke-width', 3);

  //remove any missing elements
  rects.exit()
    .remove();
}

render([1,2,3,4.5,5], 'green');
render([1,2.5,3,4,5,6,7,8,9,10], 'red');
render([2,3,4,5,6.5,7], 'yellow');
render([1,2,3,4,5,6,7], 'yellow');

// //scatterplot
// global variables
var outerWidth = 200;
var outerHeight = 100;
var circleRadius = 5;
var xColumnLabel  = 'x';
var yColumnLabel = 'y';
var divLabel = '#scatterPlot';
var dataSource = 'static/data.csv';
//create the svg element
var svg = d3.select(divLabel).append('svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight);

//create data object from csv file and render it.

function type(d){
  d[xColumnLabel] = +d[xColumnLabel];
  d[yColumnLabel] = +d[yColumnLabel];
  return d;
}

// d3.csv('static/data.csv', type, function(data){
//   render(data);
// });

d3.csv(dataSource, type, render);
d3.csv(dataSource, type, render);



//define render function

function render(data){

  //define the scale of the svg element

  var xScale = d3.scaleLinear()
    //.domain([20,80]) //data space
    .domain(d3.extent(data, function(d){return d[xColumnLabel];}))
    .range([0,outerWidth]); //pixel space

  var yScale = d3.scaleLinear()
    //.domain([100,200]) //dataspace
    .domain(d3.extent(data, function(d){return d[yColumnLabel];}))
    .range([outerHeight,0]); //invert range so min y value at bottom of plot.

    //bind elements to data
  var circles = svg.selectAll('circle').data(data);
  //add new elements
  circles.enter().append('circle')
    .attr('r', circleRadius)
    .attr('cx', function(d){return xScale(d[xColumnLabel]);})
    .attr('cy', function(d){return yScale(d[yColumnLabel]);});
  //update all elements
  circles
    .attr('fill', 'red');
  //remove old elements
  circles.exit().remove();
}
