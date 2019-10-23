var viewport = document.getElementById("viewport");
setUpElements();

/*
var context = viewport.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
context.fillStyle = backgroundcolor;
context.fillRect(0, 0, viewport.width, viewport.height);
*/

var sysSummary = false;
var economySummary = false;
var buildDialog = false;
var newEmpire = false;

var empire = createNewEmpire();
var system = new System();

system.configure();
system.drawSystem(0);

function setUpElements()
{
  var sysSpan = document.getElementsByClassName("close")[0];
  var econSpan = document.getElementsByClassName("close")[2];
  var newEmpireSpan = document.getElementsByClassName("close")[1];
  var sysModal = document.getElementById("systemSummaryModal");
  var econModal = document.getElementById("economySummaryModal");
  var newEmpireModal = document.getElementById("newEmpireModal");

  sysSpan.onclick = function() {
    sysModal.style.display = "none";
    sysSummary = false;
  }

  econSpan.onclick = function() {
    econModal.style.display = "none";
    economySummary = false;
  }

  newEmpireSpan.onclick = function() {
    newEmpireModal.style.display = "none";
    newEmpire = false;
  }

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
    sysSummary = true;
    system.showSummary();
  }
}

function showEconomySummary()
{
  if(allModalsClosed())
  {
    economySummary = true;
    empire.showSummary();
  }
}

function showBuildDialog()
{
  if(allModalsClosed())
  {
    buildDialog = true;
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
  return !(sysSummary && economySummary && buildDialog && newEmpire);
}

function createNewEmpire()
{
  if(allModalsClosed())
  {
    newEmpire = true;
    var modal = document.getElementById("newEmpireModal");
    modal.style.display = "block";
  }

  let empire = new Empire("SpaceX");
  empire.chooseStartingPlanet();
  return empire;
}