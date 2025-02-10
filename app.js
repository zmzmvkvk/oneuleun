import Router from "./js/Router.js";
import Home from "./pages/Home.js";
import Diary from "./pages/Diary.js";
import Detail from "./pages/Detail.js";
import Profile from "./pages/Profile.js";

// 라우트 설정
const routes = {
  "/": Home,
  "/diary": Diary,
  "/detail": Detail,
  "/profile": Profile,
};

// 라우터 초기화
const router = new Router(routes);

// 네비게이션 이벤트 감지 (SPA 방식으로 동작)
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }
});
