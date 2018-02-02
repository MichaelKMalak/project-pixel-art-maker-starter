var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


//Some global variables
let color = '#000';
let mouseDown = false;

$(document).ready(function() {
  //Handling submitting the size of the grid
  $('#sizePicker').on("submit",function (event) {
      let height=$("#inputHeight").val();
      let width=$("#inputWidth").val();
      if (height<=50 && width<=50) makeGrid(height,width);
      else alert ("Height and width shouldn't exceed 50 each.");
      event.preventDefault();
  });
  //Handling the color of the pixel
  $('#colorPicker').on("input", function (event){
    color= $("#colorPicker").val();
    event.preventDefault();
  });

  //Handling clicking on "clear all" button
  $('#clear').on("click", function(event){
    $("#pixelCanvas tr").each(function () {
      $('td').each(function () {
        $( this ).css("background-color", "#fff"); //Traversing on each cell and changing the color to white
      });
    });
  });
});
//Handling when mouse is up anywhere on the page 
document.addEventListener("mouseup",function(){ 
  mouseDown = false;
  $('td').off('mouseover mouseleave');
});
//Making the grid and event handler for every cell
function makeGrid(height, width) {
  //some local variables
  let table = document.getElementById("pixelCanvas");
  let row ;
  let cell;
  
  //Delete the body of the table to insert the new size
  $('#pixelCanvas > tbody').remove();
  
  //inserting the rows and columns
  for(let i=0;i<height;i++){
    row = table.insertRow(i);
    for(let j=0;j<width;j++){
      cell = row.insertCell(j);
      //while inserting each cell, we add different event handlers
      //Handling when mouse is down
      cell.addEventListener("mousedown",function(){ 
       $( this ).css("background-color", color);
       mouseDown = true;
      });
      //Handling when mouse is moving
       cell.addEventListener("mousemove",function(){ 
        if(mouseDown==true) {
          $( this ).css("background-color", color); 
        }
       });
      //Handling double clicks
       cell.addEventListener("dblclick",function(){
          $( this ).css("background-color", "#fff");
      });  
    } 
  }
  $('#clear').click(); //Clearing the grid to ensure the color of pixels are white.
};
