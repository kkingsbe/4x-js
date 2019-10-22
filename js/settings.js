var backgroundcolor = "#00006b";
var systemMinPlanets = 2;
var systemMaxPlanets = 15;
var planetDrawSize = 5;
var orbitScaling = 45; //The orbit scaling / zoom level, used when drawing the planets and their orbits
var starDrawSize = 15;
var cameraMovementConstant = 10; //The number of pixels that the camera moves by

/*
 * The speed at which all bodies will rotate. 
 * This is not realistic, but is derrived in a manner that allows a planet 
 * that is 1AU away from the sun to take 1 year to complete an orbit.
*/
var orbitalRotationSpeedPx = (2 * Math.PI * orbitScaling) / 876;

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