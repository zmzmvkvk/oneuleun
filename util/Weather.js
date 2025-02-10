const API_KEY = "ckLpBr2jdyTR4iI8rtz3g3t4tK7nJjzFSZv0sIWOxDii%2Fbxip0NYGpp6VN4d234umfuRMWopo5QVwsCNHK9ENg%3D%3D";
const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

// 🔹 날짜 및 시간 포맷팅 (YYYYMMDD, HH00) -> 오류 수정
function getBaseDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let baseTime = "0200";
  const hours = now.getHours();
  
  if (hours >= 2) baseTime = "0200";
  if (hours >= 5) baseTime = "0500";
  if (hours >= 8) baseTime = "0800";
  if (hours >= 11) baseTime = "1100";
  if (hours >= 14) baseTime = "1400";
  if (hours >= 17) baseTime = "1700";
  if (hours >= 20) baseTime = "2000";
  if (hours >= 23) baseTime = "2300";

  return { baseDate: `${year}${month}${day}`, baseTime };
}

// 🔹 특정 색상 범위 내에서 랜덤한 색상을 생성하는 함수
function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🔹 날씨별 색상 바운더리 설정
const weatherColors = {
  sunny: ["#87CEEB", "#B0E0E6", "#ADD8E6", "#A0D8EF"],
  cloudy: ["#3E3E55", "#23233E", "#4B4B62", "#5A5A72"],
  rainy: ["#2C3E50", "#1B2735", "#283046", "#364F6B"],
  snowy: ["#F0F8FF", "#FFFFFF", "#E0FFFF", "#DDEEFF"],
};

// 🔹 배경 색상을 랜덤하게 변경하는 함수
function updateBackground(className) {
  const body = document.body;
  const colors = weatherColors[className];

  if (!colors) return;

  body.style.setProperty("--current-color-1", getRandomColor(colors));
  body.style.setProperty("--current-color-2", getRandomColor(colors));
  body.style.setProperty("--current-color-3", getRandomColor(colors));
}

// 🔹 배경 애니메이션을 `requestAnimationFrame()`으로 최적화
export function startBackgroundAnimation(className) {
  function animate() {
    updateBackground(className);
    setTimeout(() => requestAnimationFrame(animate), 5000);
  }
  animate();
}

// 🔹 기상청 API에서 날씨 데이터 가져오기
export async function getWeather(nx = 55, ny = 127) {
  try {
    const { baseDate, baseTime } = getBaseDateTime();
    const url = `${BASE_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`❌ HTTP 오류 발생: ${response.status}`);
    }

    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error("❌ 날씨 정보를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// 🔹 날씨 데이터 정리 및 애니메이션 적용
export function processWeatherData(data) {
  const items = data.response.body.items.item;
  const weatherInfo = {
    temperature: null,
    sky: null,
    pty: null,
    backgroundClass: "sunny", // 기본값 (맑음)
  };

  items.forEach((item) => {
    if (item.category === "TMP") weatherInfo.temperature = item.fcstValue; 
    if (item.category === "SKY") weatherInfo.sky = item.fcstValue; 
    if (item.category === "PTY") weatherInfo.pty = item.fcstValue; 
  });

  // 🔹 날씨 유형에 따라 배경 변경
  if (weatherInfo.pty === "1" || weatherInfo.pty === "4") {
    weatherInfo.backgroundClass = "rainy"; // 🌧️ 비 (어두운 블루)
  } else if (weatherInfo.pty === "2" || weatherInfo.pty === "3") {
    weatherInfo.backgroundClass = "snowy"; // ❄️ 눈 (하얀 배경)
  } else if (weatherInfo.sky === "1") {
    weatherInfo.backgroundClass = "sunny"; // ☀️ 맑음 (화창)
  } else {
    weatherInfo.backgroundClass = "cloudy"; // ⛈️ 흐림 (어두운 보라)
  }

  return weatherInfo;
}
