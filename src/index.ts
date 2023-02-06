// import chatsPage from './pages/chats';
// import loginPage from './pages/login';
// import registerPage from './pages/register';
// import profilePage from './pages/profile';
// import errorPage from './pages/errorPage';
// import createRouter from './modules/router';
import './index.scss';
import Button, { ButtonTypes } from './components/button';
import render from './core/renderDOM';

// const root = document.getElementById('root');
// const { router, route } = createRouter(root);

// function login() {
//   root.innerHTML = loginPage();
// }

// function register() {
//   root.innerHTML = registerPage();
// }

// function profile() {
//   root.innerHTML = profilePage({ type: 'profile' });
// }

// function profileEdit() {
//   root.innerHTML = profilePage({ type: 'profileEdit' });
// }

// function passwordEdit() {
//   root.innerHTML = profilePage({ type: 'passwordEdit' });
// }

// function chats() {
//   root.innerHTML = chatsPage();
// }

// function notFound() {
//   root.innerHTML = errorPage({
//     errorCode: '404',
//     errorText: 'Такой страницы не существует...',
//     linkText: 'Назад к чатам',
//     link: '#/',
//   });
// }

// function serverError() {
//   root.innerHTML = errorPage({
//     errorCode: '500',
//     errorText: 'Мы уже фиксим',
//     linkText: 'Назад к чатам',
//     link: '#/',
//   });
// }

// route('/', chats);
// route('/signin', login);
// route('/signup', register);
// route('/profile', profile);
// route('/error', serverError);
// route('/profile-edit', profileEdit);
// route('/password-edit', passwordEdit);
// route('*', notFound);

// window.addEventListener('DOMContentLoaded', router);
// window.addEventListener('hashchange', router);

const button = new Button({
  type: ButtonTypes.BUTTON,
  buttonText: 'Я КНОПКА ТЕСТОВАЯ',
  events: {
    click: (evt) => console.log(evt),
  },
  settings: {
    withExternalID: true,
  },
});

render('#root', button);

setTimeout(() => {
  button.setProps({
    buttonText: 'Другой текст!',
  });
}, 2000);

setTimeout(() => {
  button.setProps({
    buttonText: 'Другой dтекст!',
  });
}, 5000);
