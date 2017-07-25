'use strict'

var outerWidth = 200;
var outerHeight = 200;
var margin = 25;
var circleRadius = 12;
var xColumnLabel = 'x';
var yColumnLabel = 'y';
var UID = 'UID';
var divVines = '#vines';
var divTasks = '#tasks';
var dataSource = 'static/data.csv';

//create the svg element

var svg = d3.select(divVines).append('svg')
  .attr('width', outerWidth)
  .attr('height', outerHeight);

//create group for the elements so they can be shifted away from edge of svg

var g = d3.select('svg')
  .append('g')
    .attr('transform','translate(' + margin/2 +',' + margin/2 + ')');

//convert each data element from a string to a number

function type(d){
  d[xColumnLabel] = +d[xColumnLabel];
  d[yColumnLabel] = +d[yColumnLabel];
  return d;
}

//render the data to the svg element

function renderVineyard(data){

  //define the x and y scales of the svg element

  var xScale = d3.scaleLinear()
    //set the domain of the data to the max and min x value
    .domain(d3.extent(data, function(d){return d[xColumnLabel];}))
    //set the range to the width of the svg element
    .range([0,outerWidth-margin]);

  var yScale = d3.scaleLinear()
    //set the domain of the data to the max and min y value
    .domain(d3.extent(data, function(d){return d[yColumnLabel];}))
    //set the range to the height of the svg element
    //reverse the range because y should increase as going up.
    .range([outerHeight-margin,0]);

  //bind elements to data

  var circles = g.selectAll('circle').data(data);

  //enter new elements

  circles.enter().append('circle')
    .attr('UID', function(d){return d[UID];})
    .attr('completed', 'null')
    .attr('r', circleRadius)
    .attr('cx', function(d){return xScale(d[xColumnLabel]);})
    .attr('cy', function(d){return yScale(d[yColumnLabel]);})
    .attr('fill', 'grey');
}

//Update circles with new data

function updateVineyard(data){

  //bind elements to data by key

  var circles = g.selectAll('circle').data(data,function(d){
    return d ? d.UID : this.UID;
  });

  //all circles in union of data and selection should have completed attribute
  circles.attr('completed',function(d){return d['completed'];})
  //onclick toggle the completed value true or false
    .on('click', function(){
      console.log(JSON.stringify(this.getAttribute('completed')));
      if(this.getAttribute('completed')=='true'){this.setAttribute('completed','false')};
      if(this.getAttribute('completed')=='false'){this.setAttribute('completed','true')};
      //this.getAttributeNS(this, 'completed') == true ? this.setAttribute('completed', false) : this.setAttribute('completed', true);
      //this.setAttribute('completed', true);
    });


  //all circles not in union of data and selection
  //should have null completed attribute.
  circles.exit()
    .attr('completed','null')
    .on('click', function(){this.setAttribute('completed', 'null');});

}

//create vineyard data object from csv file, convert type, and render 

d3.csv(dataSource, type, renderVineyard);

//add links to tasks div

var tasks = d3.select(divTasks);

tasks.append('p')
  .attr('onclick','displayTask(1)')
  .text('Task One');

tasks.append('p')
  .attr('onclick','displayTask(2)')
  .text('Task Two');

tasks.append('p')
  .attr('onclick','displayTask(3)')
  .text('Task Three');

//update the vineyard div

function displayTask(task){
  var myPath = 'static/data' + task + '.csv';
  d3.csv(myPath, updateVineyard);
}
