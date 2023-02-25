import './index.scss';
import renderDOM, { createRoute } from './core/renderDOM';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChatsPage from './pages/ChatsPage';

const root = document.querySelector('#root')!;

createRoute('/signup', new RegisterPage());
// createRoute('/signin', new LoginPage());
createRoute('/', new ChatsPage());

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('/signup', root);
});

window.addEventListener('hashchange', () => {
  const route = window.location.hash.slice(1);
  renderDOM(route, root);
});
