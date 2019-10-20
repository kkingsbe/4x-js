class Colony
{
  constructor(name, planet)
  {
    this.name = name;
    this.planet = planet;

    //The colonies population
    this.population = 0;

    //The number of mines that the colony has
    this.mines = 0;

    //An object that stores the colonies resources
    this.resources = {};

    this.gatherResources(0);
  }

  /*
   * Calculates the resources to be recieved by the colony
    @param elapsedTime: The time that has elapsed in hours
  */
  gatherResources(elapsedTime)
  {
    for(var resource in this.planet.resources)
    {
      if(!this.resources[resource])
      {
        this.resources[resource] = {};
        this.resources[resource].name = resource;
        this.resources[resource].amount = 0;
      }

      this.resources[resource].amount += this.planet.resources[resource] * elapsedTime * this.mines;
    }
  }

  //Adds a new mine to the colony
  addMine()
  {
    if(empire.canBuild("mine"))
    {
      empire.build("mine");
      this.mines += 1;
    }
  }
}