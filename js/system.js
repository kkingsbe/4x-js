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
    this.planets.forEach((planet) => {
      planet.colonies.forEach((colony) => {
        colony.gatherResources(elapsedTime);
      })
    })
  }

  drawSystem()
  {
    this.planets.forEach((planet) => {
      context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

      context.beginPath();
      context.arc(0, context.canvas.height/2, planet.radius * 45, 0, 2 * Math.PI, false);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.arc(planet.radius * 45, context.canvas.height/2, planetDrawSize, 0, 2 * Math.PI, false);
      context.closePath();
      context.fill();
    });
    
    context.fillStyle = "Yellow";
    context.beginPath();
    context.arc(0, context.canvas.height/2, starDrawSize, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
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
      tbody.appendChild(row);
    })

    //Replace the old tbody with the new tbody
    document.getElementById("sysTbody").parentNode.replaceChild(tbody, document.getElementById("sysTbody"));
  }
}