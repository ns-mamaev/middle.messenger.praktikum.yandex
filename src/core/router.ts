export default function createRouter(root) {
  const routes = {};

  function resolveRoute(url) {
    root.innerHTML = '';
    if (!routes[url]) {
      if (routes['*']) {
        return routes['*'];
      }
      throw new Error(`Route ${url} doesn't exist!`);
    }
    return routes[url];
  }

  function router() {
    const url = window.location.hash.slice(1) || '/';
    const routeTemplate = resolveRoute(url);

    routeTemplate();
  }

  function route(path, template) {
    if (typeof template === 'function') {
      routes[path] = template;
    }
  }

  return { route, router };
}
