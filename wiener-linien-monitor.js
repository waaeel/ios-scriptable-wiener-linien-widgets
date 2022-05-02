// Choose wiener-linien stopid
const stopID = "4639"

const data = await fetchData()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

function createWidget(data) {
  const w = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#004E2B"), new Color("#004E2B")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.setPadding(1,12,1,2)
  w.spacing = 6
  
  const title = w.addText(`${data.monitors[0].locationStop.properties.title}`)
  title.textColor = new Color("#ffcc66")  
  title.font = new Font("Menlo", 16)
  
  const first = w.addText(`[${data.monitors[0].lines[0].name}] ${data.monitors[0].lines[0].towards} ${data.monitors[0].lines[0].departures.departure[0].departureTime.countdown}`)
  first.textColor = new Color("#ffcc66")
  first.font = new Font("Menlo", 11)
  const second = w.addText(`[${data.monitors[0].lines[0].name}] ${data.monitors[0].lines[0].towards} ${data.monitors[0].lines[0].departures.departure[1].departureTime.countdown}`)
  second.textColor = new Color("#ffcc66")
  second.font = new Font("Menlo", 11)

  
  return w
}

async function fetchData() {
  const url = `https://www.wienerlinien.at/ogd_realtime/monitor?stopId=${stopID}`
  const request = new Request(url)
  const res = await request.loadJSON()
  return res.data
}
