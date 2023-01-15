export default function createRouter(root) {
  const routes = {};

  function resolveRoute(route) {
    root.innerHTML = '';
    if (!routes[route]) {
      if (routes['*']) {
        return routes['*'];
      } else {
        throw new Error(`Route ${route} doesn't exist!`);
      }
    }
    return routes[route];
  }

  function router() {
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    route();
  }

  function route(path, template) {
    if (typeof template === 'function') {
      routes[path] = template;
    }
  }

  return { route, router };
}
