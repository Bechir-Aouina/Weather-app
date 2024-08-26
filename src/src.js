import "./styles/style.css";
const input = document.querySelector("input");
const temperature = document.querySelector(".temperature");
const location = document.querySelector(".location");
const wind = document.querySelector(".wind");
const Humidity = document.querySelector(".Humidity");
const precipitation = document.querySelector(".precipitation");
const icon = document.querySelector(".icon");
const container = document.querySelector(".cont");
const toggle = document.querySelector(".toggle");
let val = "";

function celciustofahrenheit(num) {
  return ((num - 32) * 5) / 9;
}
function getdate() {
  const date = new Date();
  console.log(date.getHours());
  const fulldate =
    String(date.getFullYear()) +
    "-" +
    String(date.getMonth() + 1) +
    "-" +
    String(date.getDate());
  return fulldate;
}

async function getData() {
  let data;
  val = "Tunisia";
  try {
    const fetchdata = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tunisia/${getdate()}?key=9VRXCYQVHVSYEFUWZCCD3F896`
    );
    if (!fetchdata.ok) {
      throw new Error("Network response Error");
    }
    data = await fetchdata.json();
    console.log(data);
    processDataDay(data, val);
  } catch (err) {
    console.error(err);
  }
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      val = event.target.value;
      try {
        const fetchdata = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${val}/${getdate()}?key=9VRXCYQVHVSYEFUWZCCD3F896`
        );
        if (!fetchdata.ok) {
          throw new Error("Network response Error");
        }
        data = await fetchdata.json();
        console.log(data);
        processDataDay(data, val);
      } catch (err) {
        console.error(err);
      }
    }
  });
  toggle.addEventListener("click", () => {
    if (container.classList.contains("day")) {
      container.classList.remove("day");
      container.classList.add("night");
      toggle.textContent = "Night";
      processDataNight(data, val);
      console.log("night");
    } else if (container.classList.contains("night")) {
      container.classList.remove("night");
      container.classList.add("day");
      toggle.textContent = "Day";
      processDataDay(data, val);
      console.log("day");
    }
  });
}

function processiconDay(i) {
  const iconMap = {
    snow: "❄️",
    rain: "🌧️",
    fog: "🌁",
    wind: "🍃",
    cloudy:"☁️",
    "partly-cloudy-day": "⛅",
    "clear-day": "☀️",
  };
  icon.textContent = iconMap[i] || "❓"; // Default to a question mark if no match
}
function processiconNight(i) {
  const iconMap = {
    snow: "❄️",
    rain: "🌧️",
    fog: "🌁",
    wind: "🍃",
    cloudy:"☁️",
    "partly-cloudy-night": "🌙☁️",
    "clear-night": "🌕",
  };
  icon.innerHTML = iconMap[i] || "❓"; // Default to a question mark if no match
}
function processDataDay(data, l) {
  const i = data.days[0].icon;
  processiconDay(i);
  const t = Number(data.days[0].temp);
  const w = data.days[0].windspeed;
  const p = (data.days[0].precip * 100).toFixed(1);
  const h = data.days[0].humidity;

  location.textContent = l;

  temperature.textContent = Math.round(celciustofahrenheit(t)) + "°";
  wind.textContent = w + "Km";
  precipitation.textContent = p + "%";
  Humidity.textContent = h + "%";
}
function processDataNight(data, l) {
  const i = data.days[0].hours[20].icon;
  processiconNight(i);
  const t = Number(data.days[0].hours[20].temp);
  const w = data.days[0].hours[20].windspeed;
  const p = (data.days[0].hours[20].precip * 100).toFixed(1);
  const h = data.days[0].hours[20].humidity;

  location.textContent = l;

  temperature.textContent = Math.round(celciustofahrenheit(t)) + "°";
  wind.textContent = w + "Km";
  precipitation.textContent = p + "%";
  Humidity.textContent = h + "%";
}
/* processData() */
getData();
