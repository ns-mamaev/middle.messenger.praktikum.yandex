import './index.scss';
import renderDOM, { createRoute } from './core/renderDOM';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChatsPage from './pages/ChatsPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';

const root = document.querySelector('#root')!;

createRoute('/signup', RegisterPage);
createRoute('/signin', LoginPage);
createRoute('/error', ErrorPage);
createRoute('/profile', ProfilePage);
createRoute('/', ChatsPage);

document.addEventListener('DOMContentLoaded', () => {
  const route = window.location.hash.slice(1) || '/';
  renderDOM(route, root);
});

window.addEventListener('hashchange', () => {
  const route = window.location.hash.slice(1);
  renderDOM(route, root);
});
