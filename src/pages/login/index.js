import loginTemplate from './login.hbs';
import './login.scss';
import authForm from '../../components/authForm';

const inputsData = [
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
];

export default (props = {}) =>
  loginTemplate({
    ...props,
    authForm: authForm({
      inputsData,
      heading: 'Вход',
      buttonText: 'Авторизоваться',
      link: { href: '#/signup', text: 'Нет аккаунта?' },
    }),
  });
