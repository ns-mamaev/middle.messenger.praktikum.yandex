import Component from '../../core/Component';
import AuthForm from '../../components/AuthForm';
import './RegisterPage.scss';
import { validateInput, ValidationRules } from '../../utills/validation';
import Input from '../../components/Input';

const emailInput = new Input({
  name: 'email',
  placeholder: 'Почта',
  type: 'email',
  validationType: ValidationRules.EMAIL,
  onValidate: validateInput,
});

const loginInput = new Input({
  name: 'login',
  placeholder: 'Логин',
  type: 'text',
  validationType: ValidationRules.LOGIN,
  onValidate: validateInput,
});

const firstNameInput = new Input({
  name: 'first_name',
  placeholder: 'Имя',
  type: 'text',
  validationType: ValidationRules.NAME,
  onValidate: validateInput,
});

const secondNameInput = new Input({
  name: 'second_name',
  placeholder: 'Фамилия',
  type: 'text',
  validationType: ValidationRules.NAME,
  onValidate: validateInput,
});

const phoneInput = new Input({
  name: 'phone',
  placeholder: 'Телефон',
  type: 'tel',
  validationType: ValidationRules.PHONE,
  onValidate: validateInput,
});

const passwordInput = new Input({
  name: 'password',
  placeholder: 'Пароль',
  type: 'password',
  validationType: ValidationRules.PASSWORD,
  onValidate: validateInput,
});

const passwordRepeatInput = new Input({
  name: 'password_repeat',
  placeholder: 'Пароль (ещё раз)',
  type: 'password',
  validationType: ValidationRules.PASSWORD,
  onValidate: validateInput,
});

const inputs = [
  emailInput,
  loginInput,
  firstNameInput,
  secondNameInput,
  phoneInput,
  passwordInput,
  passwordRepeatInput,
];

const onSubmit = () => {
  const isFormNotValid = inputs.map((input) => input.checkValidity()).includes(false);
  const matchPasswords = passwordInput.value === passwordRepeatInput.value;
  if (!matchPasswords) {
    passwordRepeatInput.children.error.setProps({ errorMessage: 'Пароли не совпадают' });
  }
  if (!isFormNotValid) {
    const data = inputs.reduce((acc, { value, name }) => {
      acc[name] = value;
      return acc;
    }, {});

    console.log(data);
  }
};

class RegisterPage extends Component {
  init() {
    this.children.authForm = new AuthForm({
      heading: 'Регистрация',
      link: {
        href: '#/signin',
        text: 'Войти',
      },
      buttonLabel: 'Регистрация',
      inputs,
      onSubmit,
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
