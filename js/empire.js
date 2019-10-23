class Empire
{
  constructor(name)
  {
    this.name = name;
    this.colonies = [];
  }
  resources = {
    Iron: 2000
  };

  //Returns true if the empire has enough resources for a building
  canBuild(building)
  {
    for(var resource in buildings[building].requiredResources)
    {
      if(buildings[building][resource] > this.resources[resource]) return false;
    }
    return true;
  }

  //Subtracts the resources needed to build a building
  build(building, planet)
  {
    if(this.canBuild(building))
    {
      for(var resource in buildings[building].requiredResources)
      {
        this.resources[resource] -= buildings[building][resource]
      }
    }
  }

  //Adds a colony to the empire
  addColony(name, planet)
  {
    if(this.canBuild("colony") && planet.canBuildColony)
    {
      this.build("colony");
      var colony = new Colony(name, planet);
      this.colonies.push(colony);
      console.log(planet.colonies);
      planet.colonies.push(colony);
      return colony;
    }
    else if(!planet.canBuildColony)
    {
      alert("This planet is not suitable for colonies!");
    }
  }

  //Opens the economy summary modal
  showSummary()
  {
    var modal = document.getElementById("economySummaryModal");
    modal.style.display = "block";

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "econTbody");
    
    this.colonies.forEach((colony) => {
      var row = document.createElement("tr");

      var name = document.createElement("td");
      name.innerHTML = colony.name;

      var planet = document.createElement("td");
      planet.innerHTML = colony.planet.name;

      var mines = document.createElement("td");
      mines.innerHTML = colony.mines;

      var aluminium = document.createElement("td");
      aluminium.innerHTML = colony.resources.Aluminium.amount.toFixed(2);

      var carbon = document.createElement("td");
      carbon.innerHTML = colony.resources.Carbon.amount.toFixed(2);

      var iron = document.createElement("td");
      iron.innerHTML = colony.resources.Iron.amount.toFixed(2);

      var magnesium = document.createElement("td");
      magnesium.innerHTML = colony.resources.Magnesium.amount.toFixed(2);

      var silicon = document.createElement("td");
      silicon.innerHTML = colony.resources.Silicon.amount.toFixed(2);

      var sodium = document.createElement("td");
      sodium.innerHTML = colony.resources.Sodium.amount.toFixed(2);

      var water = document.createElement("td");
      water.innerHTML = colony.resources.Water.amount.toFixed(2);

      row.appendChild(name);
      row.appendChild(planet);
      row.appendChild(mines);
      row.appendChild(aluminium);
      row.appendChild(carbon);
      row.appendChild(iron);
      row.appendChild(magnesium);
      row.appendChild(silicon);
      row.appendChild(sodium);
      row.appendChild(water);

      tbody.appendChild(row);
    })

    //Replace the old tbody with the new tbody
    document.getElementById("econTbody").parentNode.replaceChild(tbody, document.getElementById("econTbody"));
  }

  //Allows the user to choose their starting planet
  chooseStartingPlanet()
  {
    this.showSummary();
  }
}
