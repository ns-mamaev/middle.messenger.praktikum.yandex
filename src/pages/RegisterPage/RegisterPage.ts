import Component from '../../core/Component';
import AuthForm from '../../components/AuthForm';
import './RegisterPage.scss';
import { ValidationRules } from '../../utills/validation';

type InputAttributes = {
  name: string;
  placeholder: string;
  type: string;
  validationType?: ValidationRules;
};

const inputsData: InputAttributes[] = [
  {
    name: 'email',
    placeholder: 'Почта',
    type: 'email',
    validationType: ValidationRules.EMAIL,
  },
  {
    name: 'login',
    placeholder: 'Логин',
    type: 'text',
    validationType: ValidationRules.LOGIN,
  },
  {
    name: 'first_name',
    placeholder: 'Имя',
    type: 'text',
    validationType: ValidationRules.NAME,
  },
  {
    name: 'second_name',
    placeholder: 'Фамилия',
    type: 'text',
    validationType: ValidationRules.NAME,
  },
  {
    name: 'phone',
    placeholder: 'Телефон',
    type: 'tel',
    validationType: ValidationRules.PHONE,
  },
  {
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    validationType: ValidationRules.PASSWORD,
  },
  {
    name: 'password_repeat',
    placeholder: 'Пароль (ещё раз)',
    type: 'password',
    validationType: ValidationRules.PASSWORD_REPEAT,
  },
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
