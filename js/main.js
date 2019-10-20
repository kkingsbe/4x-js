setUpElements();

var viewport = document.getElementById("viewport");
var context = viewport.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
context.fillStyle = backgroundcolor;
context.fillRect(0, 0, viewport.width, viewport.height);

var sysSummary = false;
var economySummary = false;

var empire = new Empire("SpaceX");
var system = new System();
system.drawSystem();

empire.addColony("Colony 1", system.planets[0]);
empire.colonies[0].addMine();

function setUpElements()
{
  var sysSpan = document.getElementsByClassName("close")[0];
  var econSpan = document.getElementsByClassName("close")[1];
  var sysModal = document.getElementById("systemSummaryModal");
  var econModal = document.getElementById("economySummaryModal");

  sysSpan.onclick = function() {
    sysModal.style.display = "none";
    sysSummary = false;
  }

  econSpan.onclick = function() {
    econModal.style.display = "none";
    economySummary = false;
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
    }
  }
}

function newTurn()
{
  var elapsedTime = document.getElementById("timeJumpRange").value;
  system.newTurn(elapsedTime);
}

function showSysSummary()
{
  if(!economySummary)
  {
    sysSummary = true;
    system.showSummary();
  }
}

function showEconomySummary()
{
  if(!sysSummary)
  {
    economySummary = true;
    empire.showSummary();
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
  createColony.setAttribute("class", "colonyCreate btn btn-success");
  createColony.innerHTML = "Create";

  container.appendChild(nameInput);
  container.appendChild(hostPlanetSelector);
  container.appendChild(createColony);

  body.appendChild(container);

  createColony.onclick = () => {
    container.parentNode.removeChild(container);
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "newColonyBtn");
    btn.setAttribute("class", "btn btn-primary");
    btn.setAttribute("style", "margin-top: 10px");
    btn.setAttribute("onclick", "newColony()");
    btn.innerHTML = "New Colony";
    body.appendChild(btn);

    var planet = system.getPlanet(hostPlanetSelector.value);
    empire.addColony(nameInput.value, planet);

    showEconomySummary();
  }
}