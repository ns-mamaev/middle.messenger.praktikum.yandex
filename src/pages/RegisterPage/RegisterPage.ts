import Component from '../../core/Component';
import './RegisterPage.scss';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';
import Input from '../../components/Input';

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
    root: { click: (e: MouseEvent) => console.log(e.target, 'submit!') },
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
      inputs: inputsData.map(
        (data) =>
          new Input({
            ...data,
            events: {
              root: {
                click: () => console.log('clcik'),
              },
              '.input__field': {
                focus: () => console.log('focus'),
                blur: () => console.log('blur'),
              },
            },
          }),
      ),

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
