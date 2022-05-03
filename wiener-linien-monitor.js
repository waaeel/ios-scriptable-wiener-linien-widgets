// Choose wiener-linien stopid
const stopID = "4639";

const data = await fetchData();
const widget = createWidget(data);
Script.setWidget(widget);
Script.complete();

function createWidget(data) {
  const w = new ListWidget();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#004E2B"), new Color("#004E2B")];
  bgColor.locations = [0.0, 1.0];
  w.backgroundGradient = bgColor;
  w.setPadding(1, 12, 1, 2);
  w.spacing = 6;
  
  var titleContent = "NO SERVICE - USE NIGHTLINE!";
  var firstContent = "NO SERVICE";
  var secondContent = "NO SERVICE";

  if (
    data.monitors[0] && data.monitors[0].lines[0].towards !==
    "BETRIEBSSCHLUSS ! BENÜTZEN SIE BITTE DIE NIGHTLINE"
  ) {
    titleContent = `${data.monitors[0].locationStop.properties.title}`
    firstContent = `[${data.monitors[0].lines[0].name}] ${data.monitors[0].lines[0].towards} ${data.monitors[0].lines[0].departures.departure[0].departureTime.countdown}`
    secondContent = `[${data.monitors[0].lines[0].name}] ${data.monitors[0].lines[0].towards} ${data.monitors[0].lines[0].departures.departure[1].departureTime.countdown}`
  }
  
  var title = w.addText(titleContent);
  var first = w.addText(firstContent);
  var second = w.addText(secondContent);

  title.textColor = new Color("#ffcc66");
  title.font = new Font("Menlo", 16);

  first.textColor = new Color("#ffcc66");
  first.font = new Font("Menlo", 11);

  second.textColor = new Color("#ffcc66");
  second.font = new Font("Menlo", 11);

  return w;
}

async function fetchData() {
  const url = `https://www.wienerlinien.at/ogd_realtime/monitor?stopId=${stopID}`;
  const request = new Request(url);
  const res = await request.loadJSON();
  return res.data;
}
