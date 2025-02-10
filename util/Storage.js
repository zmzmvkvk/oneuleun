const STORAGE_KEYS = {
  DIARIES: "오늘은_diaries",
  PROFILE: "오늘은_profile",
};

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage(key, defaultValue = []) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

export function saveDiary(title, content) {
  const diaries = loadFromStorage(STORAGE_KEYS.DIARIES);
  const newDiary = { id: Date.now(), title, content, date: new Date().toISOString() };
  diaries.push(newDiary);
  saveToStorage(STORAGE_KEYS.DIARIES, diaries);
}

export function getDiaries() {
  return loadFromStorage(STORAGE_KEYS.DIARIES);
}

export function saveProfile(imageUrl, bio) {
  const profile = { imageUrl, bio };
  saveToStorage(STORAGE_KEYS.PROFILE, profile);
}

export function getProfile() {
  return loadFromStorage(STORAGE_KEYS.PROFILE, { imageUrl: "", bio: "" });
}
