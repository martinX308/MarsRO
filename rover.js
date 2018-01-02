
var instructions='';
var gridBorderPositive = 5;
var gridBorderNegative = -5;
var positionBlocked= false;
var obstacles = [
  [2,0],
  [2,2],
  [3,5],
  [3,-5]
];

var myRover = {
  position: [0,0],
  direction: 'N'
};
var nextMove = {
  position: [],
  direction: ''
};

function checkStatus(rover){
  nextMove.position=rover.position;
  nextMove.direction=rover.direction;
}

function checkNextMove (rover){
  positionBlocked= false;
  for(var i=0;i<obstacles.length;i++){
    if (arraysEqual(obstacles[i],nextMove.position)){
    console.log("Obstacle in the way. Position:"+nextMove.position);
    positionBlocked= true;
    break;
    }
  }
}

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      if(rover.position[0]==gridBorderPositive){
        nextMove.position[0]=-5;
      }else{
        nextMove.position[0]++;
      }
      break;
    case 'E':
      if(rover.position[1]==gridBorderPositive){
        nextMove.position[1]=-5;
      }else {
        nextMove.position[1]++;
      }
      break;
    case 'S':
      if(rover.position[0]==gridBorderNegative){
        nextMove.position[0]=5;
      }else{
        nextMove.position[0]--;
      }
      break;
    case 'W':
      if(rover.position[1]==gridBorderNegative){
        nextMove.position[1]=5;
      }else{
        nextMove.position[1]--;
      }
      break;
  }
}


function goBack(rover) {
  switch(rover.direction) {
    case 'N':
      if(rover.position[0] == gridBorderNegative){
        nextMove.position[0]=5;
      }
      else {
        nextMove.position[0]--;
      }
      break;
    case 'E':
      if(rover.position[1] ==gridBorderNegative){
        nextMove.position[1]=5;
      }  else {
        nextMove.position[1]--;
      }
      break;
    case 'S':
      if(rover.position[0] == gridBorderPositive){
        nextMove.position[0]=-5;
      }else{
        nextMove.position[0]++;
      }
      break;
    case 'W':
      if(rover.position[1]==gridBorderPositive){
        nextMove.position[1]=-5;
      }else{
        nextMove.position[1]++;
      }
      break;
  }
}


function turnLeft(rover) {
    switch(rover.direction) {
      case 'N':
        rover.direction='W';
        break;
      case 'E':
        rover.direction='N';
        break;
      case 'S':
        rover.direction='E';
        break;
      case 'W':
        rover.direction='S';
        break;
    }
    console.log("New Rover Direction:" + rover.direction);
  }
  function turnRight(rover) {
    switch(rover.direction) {
      case 'N':
        rover.direction='E';
        break;
      case 'E':
        rover.direction='S';
        break;
      case 'S':
        rover.direction='W';
        break;
      case 'W':
        rover.direction='N';
        break;
    }

  console.log("New Rover Direction:" + rover.direction);
  }



function moveRover(instructions,rover) {
  console.log("Rover starting postion:["+ rover.position[0] + ", " + rover.position[1] + "]"+" Direction:"+rover.direction
);

  InstructionLoop:  for(var i=0;i<instructions.length;i++){
    checkStatus(rover);
    switch (instructions.charAt(i)) {
      case "f":
        goForward(rover);
        checkNextMove (rover);
        if(positionBlocked===true){
          break InstructionLoop;
        }
        rover.position = nextMove.position;
        console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
        break;

      case "b":
        goBack(rover);
        checkNextMove (rover);
        if(positionBlocked===true){
          break InstructionLoop;
        }
        rover.position = nextMove.position;
        console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      default: console.console.log("Instruction command unknown");
      }
    }
  }



  function arraysEqual(a,b) {
      /*
          Array-aware equality checker:
          Returns whether arguments a and b are == to each other;
          however if they are equal-lengthed arrays, returns whether their
          elements are pairwise == to each other recursively under this
          definition.
      */

          for(var i=0; i<a.length; i++)  // assert each element equal
              if (a[i]!=b[i]){
                  return false;
                }
          return true;
        }
moveRover('fff',myRover);
