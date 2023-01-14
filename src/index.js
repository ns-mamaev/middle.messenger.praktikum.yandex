import tpl from './tpl.hbs';
import chat from './components/chat';
import loginPage from './pages/login';
import registerPage from './pages/register';
import profilePage from './pages/profile';
import './index.scss';

const root = document.getElementById('root');

const routes = {};

function login() {
  root.innerHTML = loginPage();
}

function register() {
  root.innerHTML = registerPage();
}

function profile() {
  root.innerHTML = profilePage();
}

function notFound() {
  const p = document.createElement('p');
  p.textContent = '404 page not Found';
  root.appendChild(p);
  const link = document.createElement('a');
  link.href = '#/';
  link.textContent = 'на главную';
  root.appendChild(link);
}

function route(path, template) {
  if (typeof template === 'function') {
    routes[path] = template;
  }
}

route('/signin', login);
route('/signup', register);
route('/profile', profile);
route('*', notFound);

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

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
