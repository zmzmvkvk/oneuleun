export default class Router {
  constructor(routes) {
    if (!routes) {
      throw new Error("Router requires a routes object!");
    }
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener("popstate", () => this.loadRoute());
    document.addEventListener("DOMContentLoaded", () => this.loadRoute());
  }

  navigate(path) {
    if (!this.routes[path]) {
      console.error(`경로를 찾을 수 없음: ${path}`);
      return;
    }
    history.pushState(null, null, path);
    this.loadRoute();
  }

  loadRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes["/"];

    if (!route) {
      console.error(`페이지를 찾을 수 없음: ${path}`);
      return;
    }

    document.getElementById("app").innerHTML = route();
  }
}
