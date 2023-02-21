import Component from '../../core/Component';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';
import Input from '../../components/Input';
import './LoginPage.scss';

const inputsData = [
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
];

const button = new Button({
  label: 'Авторизоваться',
  type: 'button',
  events: {
    root: {
      click: (e: MouseEvent) => console.log(this),
    },
  },
});

class LoginPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'Вход',
      link: {
        href: '#/signup',
        text: 'Нет аккаунта?',
      },
      inputs: inputsData.map((data) => new Input({ ...data })),
      button,
    });
  }

  render() {
    return `
      <section class='login-page'>
        {{{authForm}}}
      </section>`;
  }
}

export default LoginPage;
