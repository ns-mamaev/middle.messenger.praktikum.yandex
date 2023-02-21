import Component from '../../core/Component';
import './register.scss';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';
import Input from '../../components/input';

const inputsData = [
  { name: 'email', placeholder: 'Почта', type: 'email' },
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'first_name', placeholder: 'Имя', type: 'text' },
  { name: 'second_name', placeholder: 'Фамилия', type: 'text' },
  { name: 'phone', placeholder: 'Телефон', type: 'tel' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
  { name: 'password_repeat', placeholder: 'Пароль (ещё раз)', type: 'password' },
];

const button = new Button({
  label: 'Зарегистрироваться',
  type: 'submit',
  events: {
    click: (e: MouseEvent) => console.log(this),
  },
});

class RegisterPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'Регистрация',
      link: {
        href: '#/signin',
        text: 'Войти',
      },
      inputs: inputsData.map((data) => new Input({ ...data })),

      button,
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
