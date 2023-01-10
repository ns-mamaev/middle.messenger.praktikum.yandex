import tpl from './tpl.hbs';
import chat from './components/chat';
import loginPage from './pages/login';
import registerPage from './pages/register';
import './index.scss';

const chatsData = [
  { chatName: 'Иван', lastMessage: 'Скоро ответите?' },
  { chatName: 'BestForex', lastMessage: 'Вам интересна торговля на бирже?' },
  { chatName: '8-800-555-35-34', lastMessage: 'Займы до 1млн за 10 мин' },
];

const root = document.getElementById('root');

const routes = {};

function login() {
  root.innerHTML = loginPage();
}

function register() {
  root.innerHTML = registerPage();
}

function chats() {
  const ul = document.createElement('ul');
  const link = document.createElement('a');
  link.href = '#/';
  link.textContent = 'на главную';
  chatsData.forEach((chatData) => ul.insertAdjacentHTML('beforeend', chat(chatData)));
  root.appendChild(ul);
  root.appendChild(link);
}

function greeting() {
  let div = document.createElement('div');
  div.insertAdjacentHTML('afterbegin', tpl({ username: 'Ivan' }));
  const link = document.createElement('a');
  link.href = '#/chats';
  link.textContent = 'чаты';
  root.appendChild(div);
  root.appendChild(link);
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
route('/chats', chats);
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
