//This file stores the class definitions for each of the planet types along with general settings for where they can occur
//Distance is in AU

var planetTypes = [
  "Terrestrial",
  "Gas Giant"
]

class PlanetGenerator
{
  generatePlanet(system)
  {
    //Randomly chooses the type of planet
    var type = planetTypes[Math.floor(Math.random()*planetTypes.length)];
    var name = system.name + "-" + (system.planets.length + 1);
    switch(type)
    {
      case "Terrestrial":
        return new TerrestrialPlanet(name);
        break;
      case "Gas Giant":
        return new GasGiant(name);
        break;
    }
  }
}

var terrestrialPlanetParams = {
  minRadius: 0.4,
  maxRadius: 2,
  //The resources & atmosphere + their weight
  resources: [
    {
      name: "Carbon",
      concentration: 0.01
    },
    {
      name: "Water",
      concentration: 0.01
    },
    {
      name: "Iron",
      concentration: 0.75
    },
    {
      name: "Aluminium",
      concentration: 0.01
    },
    {
      name: "Silicon",
      concentration: 0.01
    },
    {
      name: "Magnesium",
      concentration: 0.25
    },
    {
      name: "Sodium",
      concentration: 0.01
    }
  ],

  atmosphere: [
    {
      name: "Nitrogen",
      concentration: 1
    },
    {
      name: "Oxygen",
      concentration: 1
    },
    {
      name: "Hydrogen",
      concentration: 1
    },
    {
      name: "Carbon Dioxide",
      concentration: 1
    },
    {
      name: "Methane",
      concentration: 1
    },
    {
      name: "Helium",
      concentration: 1
    },
    {
      name: "Ammonia",
      concentration: 1
    }
  ]
}

class TerrestrialPlanet
{
  constructor(name)
  {
    this.name = name;
    this.type = "Terrestrial";
    this.calculateResources();
    this.calculateAtmosphere();
    this.radius = this.calculateRadius();
    this.colonies = [];
    //Boolean to allow creation of land based colonies
    this.canBuildColony = true;

    //References to the SVG objects that are assigned when the system is initaly drawn
    this.icon;
    this.orbit;
  }

  //Generates the planets resources
  calculateResources()
  {
    this.resources = {};
    terrestrialPlanetParams.resources.forEach((resource) => {
      this.resources[resource.name] = +(Math.random() * resource.concentration).toFixed(2); //Yes, the + is neccessary :(, toFixed() returns a string
    })
  }
  
  //Generates the planets atmosphere
  calculateAtmosphere()
  {
    this.atmosphere = {};
    terrestrialPlanetParams.atmosphere.forEach((gas) => {
      this.atmosphere[gas.name] = +(Math.random() * gas.concentration).toFixed(2);
    })
  }

  //Genereates a radius between the minimum and maximum defined radii for terrestrial planets
  calculateRadius()
  {
    return +(Math.random() * (terrestrialPlanetParams.maxRadius - terrestrialPlanetParams.minRadius) + terrestrialPlanetParams.minRadius).toFixed(2);
  }
}

var gasGiantParams = {
  minRadius: 9,
  maxRadius: 28,
  //The atmosphereic gasses + their concentrations
  atmosphere: [
    {
      name: "Nitrogen",
      concentration: 0.01
    },
    {
      name: "Oxygen",
      concentration: 0.01
    },
    {
      name: "Hydrogen",
      concentration: 0.75
    },
    {
      name: "Carbon Dioxide",
      concentration: 0.01
    },
    {
      name: "Methane",
      concentration: 0.01
    },
    {
      name: "Helium",
      concentration: 0.25
    },
    {
      name: "Ammonia",
      concentration: 0.01
    }
  ]
}

class GasGiant
{
  constructor(name)
  {
    this.name = name;
    this.type = "Gas Giant";
    this.calculateResources();
    this.calculateAtmosphere();
    this.radius = this.calculateRadius();
    this.colonies = [];
    //Boolean to allow creation of land based colonies
    this.canBuildColony = false;

    //References to the SVG objects that are assigned when the system is initaly drawn
    this.icon;
    this.orbit;
  }

  //Generates the planets resources
  calculateResources()
  {
    this.resources = {};
    //No surface on gas giants
    /*
    gasGiantParams.resources.forEach((resourceName) => {
      this.resources[resourceName] = +Math.random().toFixed(2); //Yes, the + is neccessary :(, toFixed() returns a string
    })
    */
  }
  
  //Generates the planets atmosphere
  calculateAtmosphere()
  {
    this.atmosphere = {};
    gasGiantParams.atmosphere.forEach((gas) => {
      this.atmosphere[gas.name] = +(Math.random() * gas.concentration).toFixed(2);
    })
  }
  
  //Genereates a radius between the minimum and maximum defined radii for terrestrial planets
  calculateRadius()
  {
    return +(Math.random() * (gasGiantParams.maxRadius - gasGiantParams.minRadius) + gasGiantParams.minRadius).toFixed(2);
  }
}