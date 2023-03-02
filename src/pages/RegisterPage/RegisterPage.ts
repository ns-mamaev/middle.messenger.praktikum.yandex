import Component from '../../core/Component';
import AuthForm from '../../components/AuthForm';
import './RegisterPage.scss';
import { validateInput, ValidationRules } from '../../utills/validation';
import FormField from '../../components/FormField';
import { InputTypes } from '../../components/Input/Input';

const emailInput = new FormField({
  name: 'email',
  placeholder: 'Почта',
  type: InputTypes.EMAIL,
  validationType: ValidationRules.EMAIL,
  onValidate: validateInput,
});

const loginInput = new FormField({
  name: 'login',
  placeholder: 'Логин',
  type: InputTypes.TEXT,
  validationType: ValidationRules.LOGIN,
  onValidate: validateInput,
});

const firstNameInput = new FormField({
  name: 'first_name',
  placeholder: 'Имя',
  type: InputTypes.TEXT,
  validationType: ValidationRules.NAME,
  onValidate: validateInput,
});

const secondNameInput = new FormField({
  name: 'second_name',
  placeholder: 'Фамилия',
  type: InputTypes.TEXT,
  validationType: ValidationRules.NAME,
  onValidate: validateInput,
});

const phoneInput = new FormField({
  name: 'phone',
  placeholder: 'Телефон',
  type: InputTypes.TEL,
  validationType: ValidationRules.PHONE,
  onValidate: validateInput,
});

const passwordInput = new FormField({
  name: 'password',
  placeholder: 'Пароль',
  type: InputTypes.PASSWORD,
  validationType: ValidationRules.PASSWORD,
  onValidate: validateInput,
});

const passwordRepeatInput = new FormField({
  name: 'password_repeat',
  placeholder: 'Пароль (ещё раз)',
  type: InputTypes.PASSWORD,
  validationType: ValidationRules.PASSWORD,
  onValidate: validateInput,
});

const fields = [
  emailInput,
  loginInput,
  firstNameInput,
  secondNameInput,
  phoneInput,
  passwordInput,
  passwordRepeatInput,
];

// const onSubmit = () => {
//   const isFormNotValid = inputs.map((input) => input.checkValidity()).includes(false);
//   const matchPasswords = passwordInput.value === passwordRepeatInput.value;
//   if (!matchPasswords) {
//     passwordRepeatInput.children.error.setProps({ errorMessage: 'Пароли не совпадают' });
//   }
//   if (!isFormNotValid) {
//     const data = inputs.reduce((acc, { value, name }) => {
//       acc[name] = value;
//       return acc;
//     }, {});

//     console.log(data);
//   }
// };

class RegisterPage extends Component {
  constructor() {
    const authForm = new AuthForm({
      heading: 'Регистрация',
      link: {
        href: '#/signin',
        label: 'Войти',
      },
      fields,
    });
    super({ authForm });
  }
  render() {
    return `
      <section class='register-page'>
        {{{authForm}}}
      </section>`;
  }
}

export default RegisterPage;
