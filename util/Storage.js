const STORAGE_KEYS = {
  DIARIES: "오늘은_diaries",
  PROFILE: "오늘은_profile",
};

// ✅ 1. 데이터 저장하기
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ✅ 2. 데이터 불러오기
export function loadFromStorage(key, defaultValue = []) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

// ✅ 3. 새로운 일기 추가
export function saveDiary(title, content) {
  const diaries = loadFromStorage(STORAGE_KEYS.DIARIES);
  const newDiary = { id: Date.now(), title, content, date: new Date().toISOString() };
  diaries.push(newDiary);
  saveToStorage(STORAGE_KEYS.DIARIES, diaries);
}

// ✅ 4. 저장된 일기 불러오기
export function getDiaries() {
  return loadFromStorage(STORAGE_KEYS.DIARIES);
}

// ✅ 5. 프로필 정보 저장
export function saveProfile(imageUrl, bio) {
  const profile = { imageUrl, bio };
  saveToStorage(STORAGE_KEYS.PROFILE, profile);
}

// ✅ 6. 저장된 프로필 정보 불러오기
export function getProfile() {
  return loadFromStorage(STORAGE_KEYS.PROFILE, { imageUrl: "", bio: "" });
}
