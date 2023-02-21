import Component from './Component';

const routes: Record<string, Component> = {};

export function createRoute(route: string, component: any) {
  routes[route] = component;
}

export default function renderDOM(route: string, root: Element): void | never {
  // eslint-disable-next-line no-param-reassign
  root.innerHTML = '';

  if (!routes[route]) {
    throw new Error("Route doesn't exist");
  }
  const page = routes[route];

  root.appendChild(page.element);

  page.dispatchComponentDidMount();
}
