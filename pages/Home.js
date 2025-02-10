import { getWeather, startBackgroundAnimation } from "../util/Weather.js";

export default function Home() {
  setTimeout(async () => {
    const weatherContainer = document.getElementById("weather-info");
    const body = document.body;

    const weatherData = await getWeather();
    if (weatherData) {
      const { temperature, sky, pty, backgroundClass } = weatherData;

      let weatherText = `기온: ${temperature}°C`;
      if (pty === "1" || pty === "4") {
        weatherText += " 🌧️ 비";
      } else if (pty === "2" || pty === "3") {
        weatherText += " ❄️ 눈";
      } else if (sky === "1") {
        weatherText += " ☀️ 맑음";
      } else {
        weatherText += " ⛈️ 흐림";
      }

      weatherContainer.innerHTML = `<p>${weatherText}</p>`;

      // 🔹 기존 클래스를 제거하고 새로운 날씨 배경 클래스 추가
      body.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg", "snowy-bg");
      body.classList.add(`${backgroundClass}-bg`);

      // 🔹 배경 애니메이션 시작 (랜덤 색상 변경)
      startBackgroundAnimation(backgroundClass);
    } else {
      weatherContainer.innerHTML = `<p>날씨 정보를 가져올 수 없습니다.</p>`;
    }
  }, 0);

  return `
    <div class="pages home">
      <h1>오늘은,</h1>
      <p>오늘의 날씨를 확인하고 일기를 작성해보세요.</p>

      <div id="weather-info">⛅ 날씨 정보를 불러오는 중...</div>

      <a href=/diary id="write-diary" data-link>새 일기 작성</a>

      <h2>내 일기 목록</h2>
      <ul id="diary-list"></ul>
    </div>
  `;
}
