import Router from "./js/Router.js";
import "./components/Header.js"
import Home from "./pages/Home.js";
import Diary from "./pages/Diary.js";
import Detail from "./pages/Detail.js";
import Profile from "./pages/Profile.js";

const routes = {
  "/": Home,
  "/diary": Diary,
  "/detail": Detail,
  "/profile": Profile,
};

const router = new Router(routes);

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }
});
