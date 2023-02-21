import './index.scss';
import renderDOM, { createRoute } from './core/renderDOM';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const root = document.querySelector('#root')!;

createRoute('/signup', new RegisterPage());
createRoute('/signin', new LoginPage());

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('/signin', root);
});

window.addEventListener('hashchange', () => {
  const route = window.location.hash.slice(1);
  renderDOM(route, root);
});
