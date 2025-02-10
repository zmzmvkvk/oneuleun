import Router from "../js/Router.js";

export default function Home() {
  setTimeout(() => {
    const writeDiaryBtn = document.getElementById("write-diary");

    if (writeDiaryBtn) {
      writeDiaryBtn.addEventListener("click", () => {
        window.router.navigate("/diary");
      });
    }
  }, 0);

  return `
    <div class="home">
      <h1>오늘은,</h1>
      <p>오늘의 날씨를 확인하고 일기를 작성해보세요.</p>

      <button id="write-diary">새 일기 작성</button>

      <h2>내 일기 목록</h2>
      <ul id="diary-list"></ul>
    </div>
  `;
}
