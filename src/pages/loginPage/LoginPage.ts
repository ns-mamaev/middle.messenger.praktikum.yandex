import Component from '../../core/Component';
import AuthForm from '../../components/authForm';
import Input from '../../components/Input';
import './LoginPage.scss';
import { validateInput, ValidationRules } from '../../utills/validation';

const loginInput = new Input({
  name: 'login',
  placeholder: 'Логин',
  type: 'text',
  validationType: ValidationRules.LOGIN,
  onValidate: validateInput,
});

const passwordInput = new Input({
  name: 'password',
  placeholder: 'Пароль',
  type: 'password',
  validationType: ValidationRules.PASSWORD,
  onValidate: validateInput,
});

const inputs = [loginInput, passwordInput];

const onSubmit = () => {
  const isFormNotValid = inputs.map((input) => input.checkValidity()).includes(false);
  if (!isFormNotValid) {
    const data = inputs.reduce((acc, { value, name }) => {
      acc[name] = value;
      return acc;
    }, {});

    console.log(data);
  }
};

class LoginPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'Вход',
      link: {
        href: '#/signup',
        text: 'Нет аккаунта?',
      },
      inputs,
      buttonLabel: 'Войти',
      onSubmit,
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
