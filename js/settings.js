var backgroundcolor = "#00006b";
var systemMinPlanets = 2;
var systemMaxPlanets = 15;
var planetDrawSize = 5;
var orbitScaling = 45; //The orbit scaling / zoom level, used when drawing the planets and their orbits
var starDrawSize = 15;
var cameraMovementConstant = 10; //The number of pixels that the camera moves by

//This variable stores the number of hours since game start
var totalElapsedHours = 0;
var currentDate = new Date('2020', '01' -1, '01');
var currentDateText = currentDate.toString();

/*
 * The speed at which all bodies will rotate. 
 * This is not realistic, but is derrived in a manner that allows a planet 
 * that is 1AU away from the sun to take 1 year to complete an orbit.
*/
var orbitalRotationSpeedPx = (2 * Math.PI) / 8760;

var closestPlanetOrbit = 2; //The closest 2 planets' orbits can be, in AU

var buildings = {
  colony: {
    requiredResources : {
      Iron: 500
    }
  },
  mine: {
    requiredResources: {
      Iron: 1000
    }
  }
}

//Gotta add this method since it doesn't seem to exist :(
Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}
