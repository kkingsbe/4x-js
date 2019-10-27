var viewport = document.getElementById("viewport");
setUpElements();

/*
var context = viewport.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
context.fillStyle = backgroundcolor;
context.fillRect(0, 0, viewport.width, viewport.height);
*/

//A string that stores the active modal popup
var activeScreen = "none"

createNewEmpire();

//Will be initialized once the user creates their empire thorugh the dialog
var empire;
var system = new System();

system.configure();
system.drawSystem(0);

function setUpElements()
{
  var sysModal = document.getElementById("systemSummaryModal");
  var econModal = document.getElementById("economySummaryModal");
  var newEmpireModal = document.getElementById("newEmpireModal");
  var buildModal = document.getElementById("buildModal");

  //Set on the onclick function for the close buttons
  document.querySelectorAll(".close").forEach(element => {
    element.addEventListener("click", event => {
      var modal = element.parentNode.parentNode.parentNode;
      modal.style.display = "none";
      activeScreen = "none";
    })
  })


  
  window.onkeypress = function(event) {
    if(event.target == sysModal) {
      this.sysModal.style.display = "none";
    }
  }

  document.onkeypress = function(event) {
    switch(event.key)
    {
      case "s":
        showSysSummary();
        break;
      case "e":
        showEconomySummary();
        break;
      case "-":
        zoomOut();
        break;
      case "+":
        zoomIn();
        break;
    }
  }

  document.onkeydown = function(event) {
    switch(event.key)
    {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
    }
  }
}

function newTurn()
{
  var elapsedTime;
  switch(document.getElementById("timeJumpSelector").value)
  {
    case "5 seconds":
      elapsedTime = 5 / (60 * 60);
      break;
    case "30 seconds":
      elapsedTIme = 30 / (60 * 60);
      break;
    case "2 minutes":
      elapsedTime = 2 / 60;
      break;
    case "5 minutes":
      elapsedTime = 5 / 60;
      break;
    case "20 minutes":
      elapsedTime = 20 / 60;
      break;
    case "1 hour":
      elapsedTime = 1;
      break;
    case "3 hours":
      elapsedTime = 3;
      break;
    case "8 hours":
      elapsedTime = 8;
      break;
    case "1 day":
      elapsedTime = 1 * 24;
      break;
    case "5 days":
      elapsedTime = 5 * 24;
      break;
    case "30 days":
      elapsedTime = 30 * 24;
      break;
    case "Turn Length":
      elapsedTime = "none";
  }

  if(elapsedTime != "none") 
  {
    system.newTurn(elapsedTime);
    totalElapsedHours += elapsedTime;
    currentDate = addHours(currentDate, elapsedTime);
    currentDateText = currentDate.toUTCString();
    document.getElementById("dateLabel").innerHTML = currentDateText;
  }
}

function newTurnNEW(elapsedTime)
{
  system.newTurn(elapsedTime);
}

function showSysSummary()
{
  if(allModalsClosed())
  {
    activeScreen = "sysSummary";
    system.showSummary();
  }
}

function showEconomySummary()
{
  if(allModalsClosed())
  {
    activeScreen = "economySummary";
    empire.showSummary();
  }
}

function showBuildDialog()
{
  if(allModalsClosed())
  {
    activeScreen = "buildDialog";
    empire.showBuildDialog();
  }
}

function newColony()
{
  var newColonyBtn = document.getElementById("newColonyBtn");
  newColonyBtn.parentNode.removeChild(newColonyBtn);

  var body = document.getElementById("economyModalBody");

  var container = document.createElement("div");
  container.setAttribute("id", "newColonyContainer");
  container.setAttribute("class", "newColonyContainer");

  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("class", "form-control colonyNameInput");
  nameInput.setAttribute("placeholder", "Name");

  var hostPlanetSelector = document.createElement("select");
  hostPlanetSelector.setAttribute("class", "form-control colonyPlanetSelect");

  system.planets.forEach((planet) => {
    var planetOption = document.createElement("option");
    planetOption.innerHTML = planet.name;
    hostPlanetSelector.appendChild(planetOption);
  })

  var createColony = document.createElement("button");
  createColony.setAttribute("id", "createColony");
  createColony.setAttribute("type", "button");
  createColony.setAttribute("class", "colonyCreate btn primary-btn");
  createColony.innerHTML = "Create";

  container.appendChild(nameInput);
  container.appendChild(hostPlanetSelector);
  container.appendChild(createColony);

  body.appendChild(container);

  createColony.onclick = () => {
    var planet = system.getPlanet(hostPlanetSelector.value);
    if(empire.canBuild("colony") && planet.canBuildColony)
    {
      container.parentNode.removeChild(container);
      var btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.setAttribute("id", "newColonyBtn");
      btn.setAttribute("class", "btn primary-btn");
      btn.setAttribute("style", "margin-top: 10px");
      btn.setAttribute("onclick", "newColony()");
      btn.innerHTML = "New Colony";
      body.appendChild(btn);

      empire.addColony(nameInput.value, planet);
      empire.showSummary();
    }
    else if(!planet.canBuildColony)
    {
      alert("This planet is not suitable for colonies!");
    }
  }
}

function moveLeft()
{
  var star = document.getElementById("starIcon");
  star.setAttribute("cx", +star.getAttribute("cx") + cameraMovementConstant);

  system.planets.forEach((planet) => {
    planet.icon.setAttribute("cx", +planet.icon.getAttribute("cx") + cameraMovementConstant);
    planet.orbit.setAttribute("cx", +planet.orbit.getAttribute("cx") + cameraMovementConstant);
  })
}

function moveRight()
{
  var star = document.getElementById("starIcon");
  star.setAttribute("cx", +star.getAttribute("cx") - cameraMovementConstant);

  system.planets.forEach((planet) => {
    planet.icon.setAttribute("cx", +planet.icon.getAttribute("cx") - cameraMovementConstant);
    planet.orbit.setAttribute("cx", +planet.orbit.getAttribute("cx") - cameraMovementConstant);
  })
}

function moveDown()
{
  var star = document.getElementById("starIcon");
  star.setAttribute("cy", +star.getAttribute("cy") - cameraMovementConstant);

  system.planets.forEach((planet) => {
    planet.icon.setAttribute("cy", +planet.icon.getAttribute("cy") - cameraMovementConstant);
    planet.orbit.setAttribute("cy", +planet.orbit.getAttribute("cy") - cameraMovementConstant);
  })
}

function moveUp()
{
  var star = document.getElementById("starIcon");
  star.setAttribute("cy", +star.getAttribute("cy") + cameraMovementConstant);

  system.planets.forEach((planet) => {
    planet.icon.setAttribute("cy", +planet.icon.getAttribute("cy") + cameraMovementConstant);
    planet.orbit.setAttribute("cy", +planet.orbit.getAttribute("cy") + cameraMovementConstant);
  })
}

function zoomIn()
{
  orbitScaling *= 1.5;
  system.drawSystem(0);
}

function zoomOut()
{
  orbitScaling /= 1.5;
  system.drawSystem(0);
}

function addHours(date, hours) 
{
  return new Date(date.getTime() + hours*3600000);
}

function allModalsClosed()
{
  return activeScreen == "none";
}

function createNewEmpire()
{
  if(allModalsClosed())
  {
    newEmpire = true;
    var modal = document.getElementById("newEmpireModal");
    modal.style.display = "block";
  }
}

function finishCreateEmpire()
{
  empire = new Empire(document.getElementById("empireNameInput").value);

  newEmpireModal.style.display = "none";
  newEmpire = false;

  showEconomySummary();
}

function designSelectUpdate()
{
  let body = document.getElementById("designBody");
  body.childNodes.forEach((element) => {
    body.removeChild(element);
  })

  let select = document.getElementById("designSelect");
  switch(select.value)
  {
    case "Ship":
      break;
    case "Missile":
      break;
    case "Missile Tube":
      break;
    case "Laser":
      break;
    case "Ballistic Weapon":
      break;
  }
}

function showShipComponentDialog(name)
{
  var designComponentDialog = document.getElementById("designComponentDialog");
  designComponentDialog.style.display = "block";

  //REPLACE THIS
  var ship = new Ship("test");

  switch(name)
  {
    case "Fuel Storage":
      break;
    case "Engines":
      showEngines();
      break;
  }

  function showEngines()
  {
    var selectedEngine;
    document.getElementById("componentSelectTableHeader").childNodes.forEach((element) => {
      document.getElementById("componentSelectTableHeader").removeChild(element);
    })

    document.getElementById("componentSelectTableBody").childNodes.forEach((element) => {
      document.getElementById("componentSelectTableBody").removeChild(element);
    })

    var header = document.createElement("tr");
    header.setAttribute("id", "header");
    components.engines.fields.forEach((field) => {
      var th = document.createElement("th");
      th.innerHTML = field;
      header.appendChild(th);
    })
    document.getElementById("componentSelectTableHeader").appendChild(header);

    components.engines.designed.forEach((engine) => {
      var row = document.createElement("tr");
      for(var param in engine)
      {
        var text = "";
        if(param == "materials")
        {
          var materials = engine.materials;
          for(var material in materials)
          {
            text += material + ": " + materials[material] + ", ";
          }
          text = text.replace(/,\s*$/, "");
        }
        else
        {
          text = engine[param];
        }
        var td = document.createElement("td");
        td.innerHTML = text;
        row.appendChild(td);
      }
      document.getElementById("componentSelectTableBody").appendChild(row);
    })

    //Add onclick handlers to the rows
    var rows = document.getElementById("componentSelectTable").rows;
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
                selectedEngine = this.cells[0].innerHTML;
                var row = this.cells[0].parentNode;
                $(row).addClass("selected").siblings().removeClass("selected");
        };}(rows[i]);
    }

    //Add onclick handler to "add" button
    var addBtn = document.getElementById("addComponentBtn");
    addBtn.onclick = function() {
      let amount = document.getElementById("addComponentInput").value;
      if(!ship.components.engines.find(engine => engine.name == selectedEngine))
      {
        ship.components.engines.push(components.engines.designed.find(engine => engine.name == selectedEngine));
        ship.components.engines.find(engine => engine.name == selectedEngine).amount = +amount;
      }
      else
      {
        ship.components.engines.find(engine => engine.name == selectedEngine).amount += +amount;
      }
      $(document.getElementById("componentSelectTable")).find("tr").removeClass("selected");
    }
  }
}