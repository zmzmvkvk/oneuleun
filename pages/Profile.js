import { saveProfile, getProfile } from "../util/Storage.js";

export default function Profile() {
  setTimeout(() => {
    const profilePicInput = document.getElementById("profile-pic");
    const previewImg = document.getElementById("preview-img");
    const bioInput = document.getElementById("profile-bio");
    const saveButton = document.getElementById("save-profile");

    saveButton.replaceWith(saveButton.cloneNode(true));
    const newSaveButton = document.getElementById("save-profile");

    function loadProfile() {
      const profile = getProfile();
      if (profile.imageUrl) {
        previewImg.src = profile.imageUrl;
        previewImg.style.display = "block";
      } else {
        previewImg.src = "../assets/images/default-profile.png"; // 기본 이미지
        previewImg.style.display = "block";
      }
      bioInput.value = profile.bio || "";
    }

    loadProfile();

    profilePicInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
          previewImg.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    newSaveButton.addEventListener("click", () => {
      const imageUrl = previewImg.src.includes("default-profile.png") ? "" : previewImg.src;
      const bio = bioInput.value.trim();

      saveProfile(imageUrl, bio);
      alert("프로필이 저장되었습니다!");
    });
  }, 0);

  return `
    <div class="profile">
      <h1>마이페이지</h1>
      
      <label for="profile-pic">프로필 이미지:</label>
      <input type="file" id="profile-pic" accept="image/*">
      <img id="preview-img" src="/assets/images/default-profile.png" alt="프로필 이미지 미리보기"
        style="display:block; width: 100px; height: 100px; border-radius: 50%;">

      <label for="profile-bio">자기소개:</label>
      <textarea id="profile-bio" placeholder="자기소개를 입력하세요"></textarea>

      <button id="save-profile">저장</button>
    </div>
  `;
}
