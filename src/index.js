// import chatsPage from './pages/chats';
// import loginPage from './pages/login';
// import registerPage from './pages/register';
// import profilePage from './pages/profile';
// import errorPage from './pages/errorPage';
// import createRouter from './modules/router';
// import './index.scss';
import Block from './modules/Block';

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

function render(selector, block) {
  const root = document.querySelector(selector);
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();
  return root;
}

class Button extends Block {
  constructor(props) {
    super('button', props);
  }

  render() {
    return `<span>${this.props.text}</span>`;
  }
}

const button = new Button({
  text: 'Click here!',
});

render('#root', button);

setTimeout(() => {
  button.setProps({
    text: 'Click me, please',
  });
}, 3000);
