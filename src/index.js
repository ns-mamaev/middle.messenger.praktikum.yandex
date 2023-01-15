import chatsPage from './pages/chats';
import loginPage from './pages/login';
import registerPage from './pages/register';
import profilePage from './pages/profile';
import errorPage from './pages/errorPage';
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
  root.innerHTML = profilePage({ type: 'profile' });
}

function profileEdit() {
  root.innerHTML = profilePage({ type: 'profileEdit' });
}

function passwordEdit() {
  root.innerHTML = profilePage({ type: 'passwordEdit' });
}

function chats() {
  root.innerHTML = chatsPage();
}

function notFound() {
  root.innerHTML = errorPage({
    errorCode: '404',
    errorText: 'Такой страницы не существует...',
    linkText: 'Назад к чатам',
    link: '#/chats',
  });
}

function serverError() {
  root.innerHTML = errorPage({
    errorCode: '500',
    errorText: 'Мы уже фиксим',
    linkText: 'Назад к чатам',
    link: '#/chats',
  });
}

function route(path, template) {
  if (typeof template === 'function') {
    routes[path] = template;
  }
}

route('/signin', login);
route('/signup', register);
route('/profile', profile);
route('/chats', chats);
route('/error', serverError);
route('/profile-edit', profileEdit);
route('/password-edit', passwordEdit);
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
