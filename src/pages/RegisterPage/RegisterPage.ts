import Component from '../../core/Component';
import AuthForm from '../../components/AuthForm';
import './RegisterPage.scss';

const inputsData = [
  { name: 'email', placeholder: 'Почта', type: 'email' },
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'first_name', placeholder: 'Имя', type: 'text' },
  { name: 'second_name', placeholder: 'Фамилия', type: 'text' },
  { name: 'phone', placeholder: 'Телефон', type: 'tel' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
  { name: 'password_repeat', placeholder: 'Пароль (ещё раз)', type: 'password' },
];

class RegisterPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'Регистрация',
      link: {
        href: '#/signin',
        text: 'Войти',
      },
      buttonLabel: 'Регистрация',
      inputsData,
    });
  }

  render() {
    return `
      <section class='register-page'>
        {{{authForm}}}
      </section>`;
  }
}

export default RegisterPage;
