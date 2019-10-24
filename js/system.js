class System
{
  constructor()
  {
    this.numPlanets = this.calculateNumPlanets();
    this.name = "Sol";
    this.generatePlanets();
  }

  calculateNumPlanets()
  {
    return Math.floor(Math.random() * (systemMaxPlanets - systemMinPlanets) + systemMinPlanets);
  }

  /*
  generatePlanets()
  {
    this.planets = [];
    var planetGenerator = new PlanetGenerator();
    for(var i = 0; i < this.numPlanets; i++)
    {
      //Regenerate the planet until it is farther away than the closest orbit as defined in the settings.js file
      var goodOrbit = false;
      while(!goodOrbit)
      {
        var planet = planetGenerator.generatePlanet(this);
        if(this.planets.length > 0)
        {
          for(var otherPlanet of this.planets)
          {
            if(Math.abs(otherPlanet.radius - planet.radius) > closestPlanetOrbit)
            {
              console.log(Math.abs(otherPlanet.radius - planet.radius));
              goodOrbit = true;
            }
          }
          console.log(planet);
        }
        else
        {
          goodOrbit = true;
        }
      }
      this.planets.push(planet);
    }
    this.planets.sort((a,b) => {
      return a.radius - b.radius;
    })
    this.planets.forEach((planet) => {
      planet.name = this.name + "-" + (this.planets.indexOf(planet) + 1);
    })
    console.log(this)
  }
  */

  generatePlanets()
  {
    this.planets = [];
    var planetGenerator = new PlanetGenerator();
    for(var i = 0; i < this.numPlanets; i++)
    {
      this.planets.push(planetGenerator.generatePlanet(this));
    }
    this.planets.sort((a,b) => {
      return a.radius - b.radius;
    })
    this.planets.forEach((planet) => {
      planet.name = this.name + "-" + (this.planets.indexOf(planet) + 1);
    })
    console.log(this)
  }

  //Returns a reference to the planet
  getPlanet(name)
  {
    var requestedPlanet;
    this.planets.forEach((planet) => {
      if(planet.name == name)
      {
        requestedPlanet = planet;
      }
    })
    return requestedPlanet;
  }

  newTurn(elapsedTime)
  {
    this.drawSystem(elapsedTime);

    this.planets.forEach((planet) => {
      planet.colonies.forEach((colony) => {
        colony.gatherResources(elapsedTime);
      })
    })
  }

  configure()
  {
    //Assign SVG objects to the planets
    var bBox = viewport.getBoundingClientRect();
    this.planets.forEach((planet) => {
      var orbit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      orbit.setAttribute("id", planet.name + "_Orbit");
      orbit.setAttribute("cy", bBox.height / 2);
      orbit.setAttribute("cx", 0);
      orbit.setAttribute("r", planet.radius * orbitScaling);
      orbit.setAttribute("stroke-width", "1");
      orbit.setAttribute("stroke", "yellow");
      orbit.setAttribute("fill", "none");
      viewport.appendChild(orbit);

      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("id", planet.name + "_Icon");
      circle.setAttribute("cx", planet.radius * orbitScaling);
      circle.setAttribute("cy", bBox.height / 2);
      circle.setAttribute("r", planetDrawSize);
      circle.setAttribute("stroke", "black");
      circle.setAttribute("fill", "blue");
      viewport.appendChild(circle);

      planet.icon = circle;
      planet.orbit = orbit;
    })

    var star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("id", "starIcon");
    star.setAttribute("cx", 0);
    star.setAttribute("cy", bBox.height / 2);
    star.setAttribute("r", planetDrawSize);
    star.setAttribute("stroke", "orange");
    star.setAttribute("fill", "yellow");
    viewport.appendChild(star);
  }

  drawSystem(elapsedTime)
  {
    var star = document.getElementById("starIcon");
    var starX = star.getAttribute("cx");
    var starY = star.getAttribute("cy");
    
    this.planets.forEach((planet) => {
      var currentX = planet.icon.getAttribute("cx");
      var currentY = planet.icon.getAttribute("cy");

      var xCorrected = +currentX - starX;
      var yCorrected = +currentY - starY;

      var currentAngle = Math.atan2(yCorrected, xCorrected);
      var arcLen = orbitalRotationSpeedPx * elapsedTime * orbitScaling;
      var newAngle = currentAngle + (arcLen / (planet.radius * orbitScaling));
      
      var newY = (planet.radius * orbitScaling) * Math.sin(newAngle);
      var newX = (planet.radius * orbitScaling) * Math.cos(newAngle);

      planet.icon.setAttribute("cx", newX + +starX);
      planet.icon.setAttribute("cy", newY + +starY);
      planet.orbit.setAttribute("cx", +starX);
      planet.orbit.setAttribute("cy", +starY);
      planet.orbit.setAttribute("r", Math.sqrt(newX**2 + newY**2));
    })
  }

  showSummary()
  {
    var table = document.getElementById("sysSummaryTable");
    var modal = document.getElementById("systemSummaryModal");
    modal.style.display = "block";

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "sysTbody");

    this.planets.forEach((planet) => {
      var row = document.createElement("tr");

      var name = document.createElement("td");
      name.innerHTML = planet.name;
      var type = document.createElement("td");
      type.innerHTML = planet.type;
      var radius = document.createElement("td");
      radius.innerHTML = planet.radius;

      row.appendChild(name);
      row.appendChild(type);
      row.appendChild(radius);

      for(var resource in planet.remainingResources)
      {
        var td = document.createElement("td");
        td.innerHTML = planet.remainingResources[resource];
        row.appendChild(td);
      }

      tbody.appendChild(row);
    })

    //Replace the old tbody with the new tbody
    document.getElementById("sysTbody").parentNode.replaceChild(tbody, document.getElementById("sysTbody"));
  }

  //Centers the system in the viewport
  center()
  {
    var bBox = viewport.getBoundingClientRect();
    var star = document.getElementById("starIcon");
    star.setAttribute("cx", bBox.width / 2);
    star.setAttribute("cy", bBox.height / 2);
    this.drawSystem(0);
  }
}
