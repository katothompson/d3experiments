'use strict';

var outerWidth = 200;
var outerHeight = 400;
var circleRadius = outerHeight/83;
var xColumnLabel  = 'x';
var yColumnLabel = 'y';
var divLabel = '#vines';

var zoom = d3.zoom();

//create the svg element
var svg = d3.select(divLabel).append('svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight)
  //call zoom on zoom event?
  .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 }));

//data.csv contains lat and long for each vine
//csv files contain strings, so convert to integers

function type(d){
  d[xColumnLabel] = +d[xColumnLabel];
  d[yColumnLabel] = +d[yColumnLabel];
  return d;
}

//define render function
//
//this takes the data, which is the array of csv rows,
//and binds it to an array of existing svg elements.
//the union of these two arrays creates three groups
//  1) elements that are in the svg element array but not in data array
//  2) elements that are in the svg element array and in the data array
//  3) elements that are not in the svg element array but are in the data array.
//then we perform operations on each of these groups.


function render(data){

  //xScale and yScale will convert the data to the the scale of the svg element

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d){return d[xColumnLabel];}))
    .range([0,outerWidth]); //pixel space

  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d){return d[yColumnLabel];}))
    .range([outerHeight,0]); //data space
                              //invert range so min y value at bottom of plot.

  //bind svg elements to data elements

  var circles = svg.selectAll('circle').data(data);

  //to access elements in both data and svg arrays, circles
  //to access elements in data array but not svg array, circles.enter()
  //to access elements in svg array but not data array, circles.exit()

  //starting with the data elements for which there is no
  //existing counterpart in the svg element array,
  //we will create a new svg element and append it to svg,


  circles.enter().append('circle')
    .attr('r', circleRadius)
    .attr('cx', function(d){return xScale(d[xColumnLabel]);})
    .attr('cy', function(d){return yScale(d[yColumnLabel]);})
    .attr('fill','grey')
    //next we merge circles with circles.enter() and
    //set the fill attribute.
    .merge(circles)
    .attr('fill', function(d){
      if(d['something'] == 2){
        return 'blue';
      };
      if(d['something'] == 1){return 'red'}
      else{
        return 'yellow';
      };
    });

  //if there were any svg elements not in the data array, remove old elements

  circles.exit().remove();
}


// d3.csv(url[[, row], callback])
//d3.csv(url) returns an array of objects
//each object is a row from the csv file.

//this d3.csv takes data array from the csv file and
//runs it through the functions type and render
//type converts strings to ints and render puts the vines on the page.

d3.csv('static/selectedvines.csv', type, render);

// Next, figure out how to join by key so that can update with
// a partial list of vines. Then add onclick so can change status of vine.
