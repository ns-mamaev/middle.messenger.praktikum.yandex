import Component from '../../core/Component';
import template from './login.hbs';
import './login.scss';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';
import Input from '../../components/input';

const inputsData = [
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
];

const button = new Button({
  label: '1234',
  type: 'button',
  events: {
    click: (e: MouseEvent) => console.log(this),
  },
});

setTimeout(() => button.setProps({ label: 'Изменилось название кнопки' }), 1000);

class LoginPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'LOGIN',
      link: {
        href: 'http://ya.ru',
        text: 'link heading',
      },
      inputs: inputsData.map((data) => new Input({ ...data })),

      button,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
