var components = {
  /*
   * technology: The type of engine
   * thrust: The thrust of the engine in KN. The max speed of a ship is determined by how fast it would be able to accelerate in one hour.
   * fuelConsumption: The amount of fuel (in tons) required per hour
   * weight: The weight in tons
   * buildTime: The number of factory-hours that it will take for the engine to be produced (Components are assembled in factories first before being combined into the final ship at the shipyard)
   * crewRequired: The number of crew required to operate the component
   * materials: An object that stores which materials are needed for the construction of this component
  */
  engines : {
    //The fields used when creating the table
    fields : [
      "Name",
      "Technology",
      "Thrust (KN)",
      "Fuel Consumption",
      "Weight",
      "Build Time",
      "Crew",
      "Materials"
    ],
    designed : [
      {
        name: "Raptor",
        technology: "Chemical Engine",
        thrust : 30,
        fuelConsumption: 1,
        weight: 1,
        buildTime: 15,
        crewRequired: 2,
        materials : {
          Iron: 1000,
          Carbon: 150,
          Aluminium: 20,
          Silicon: 5
        }
      },
      {
        name: "Merlin",
        technology: "Chemical Engine",
        thrust : 15,
        fuelConsumption: 0.5,
        weight: 1,
        buildTime: 15,
        crewRequired: 2,
        materials : {
          Iron: 1000,
          Carbon: 150,
          Aluminium: 20,
          Silicon: 5
        }
      }
    ]
  }
}