import "./styles/style.css";
const input = document.querySelector("input");
const temperature = document.querySelector(".temperature");
const location = document.querySelector(".location");
const wind = document.querySelector(".wind");
const Humidity = document.querySelector(".Humidity");
const precipitation = document.querySelector(".precipitation");
const icon = document.querySelector(".icon");
let val = "";
console.log("hello form src js");
function celciustofahrenheit(num) {
  return ((num - 32) * 5) / 9;
}
function getdate() {
  const date = new Date();
  const fulldate =
    String(date.getFullYear()) +
    "-" +
    String(date.getMonth() + 1) +
    "-" +
    String(date.getDate());
  return fulldate;
}

async function getData() {
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      val = event.target.value;
      const fetchdata = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${val}/${getdate()}?key=9VRXCYQVHVSYEFUWZCCD3F896`
      );

      const data = await fetchdata.json();

      processData(data, val);
     
    }
  });
}
function processicon(i) {
  if (i === "snow") {
    icon.textContent="❄️";
  }
  else if(i==="rain"){
    icon.textContent="🌧️"
  }
  else if(i==="fog"){
    icon.textContent="🌁"
  }
  else if(i=="wind"){
    icon.textContent="🍃"
  }
  else if(i==="partly-cloudy-day"){
    icon.textContent="⛅"
  }
  else if(i==="clear-day"){
    icon.textContent="☀️"
  }
}
function processData(data, l) {
  const i = data.days[0].icon;
  processicon(i)
  const t = Number(data.days[0].temp);
  console.log(t);
  const w = data.days[0].windspeed;
  const p = data.days[0].precip * 100;
  const h = data.days[0].humidity;
  location.textContent = l;

  temperature.textContent = Math.round(celciustofahrenheit(t)) + "°";
  wind.textContent = w + "Km";
  precipitation.textContent = p + "%";
  Humidity.textContent = h + "%";
}
/* processData() */
getData();
