import Component from '../../core/Component';
import template from './login.hbs';
import './login.scss';
import AuthForm from '../../components/authForm';
import Button from '../../components/button';

// const inputsData = [
//   { name: 'login', placeholder: 'Логин', type: 'text' },
//   { name: 'password', placeholder: 'Пароль', type: 'password' },
// ];

const button = new Button({
  label: '1234',
  type: 'button',
  events: {
    click: (e: MouseEvent) => console.log(e.target!.textContent),
  },
});
setTimeout(() => {
  console.log('update');
  button.setProps({ label: 'Click me!' });
}, 1000);

class LoginPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: '12345',
      link: {
        href: 'http://ya.ru',
        text: 'link heading',
      },
      button,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
