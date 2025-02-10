import { saveDiary, getDiaries } from "../util/Storage.js"

export default function Diary() {
  setTimeout(() => {
    const saveButton = document.getElementById("save-diary");
    const diaryList = document.getElementById("diary-list");

    function renderDiaries() {
      diaryList.innerHTML = "";
      const diaries = getDiaries();
      diaries.forEach((diary) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${diary.title}</strong> - ${new Date(diary.date).toLocaleDateString()}`;
        diaryList.appendChild(listItem);
      });
    }

    renderDiaries();

    saveButton.addEventListener("click", () => {
      const title = document.getElementById("diary-title").value;
      const content = document.getElementById("diary-content").value;

      if (title.trim() === "" || content.trim() === "") {
        alert("제목과 내용을 입력해주세요!");
        return;
      }

      saveDiary(title, content);
      renderDiaries();
      document.getElementById("diary-title").value = "";
      document.getElementById("diary-content").value = "";
    });
  }, 0);

  return `
    <div class="pages diary">
      <h1>일기장</h1>
      <p>오늘의 기분을 기록해보세요!</p>

      <input type="text" id="diary-title" placeholder="제목을 입력하세요">
      <textarea id="diary-content" placeholder="오늘 하루는 어땠나요?"></textarea>

      <button id="save-diary">저장</button>

      <h2>내 일기 목록</h2>
      <ul id="diary-list"></ul>
    </div>
  `;
}
