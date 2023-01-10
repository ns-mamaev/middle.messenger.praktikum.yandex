import tpl from './tpl.hbs';
import './style.scss';
import authForm from '../../components/authForm';

const inputs = [
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
];

export default (props = {}) =>
  tpl({
    ...props,
    inputs,
    buttonText: 'Авторизоваться',
    heading: 'Вход',
    link: { href: '#/signup', text: 'Нет аккаунта?' },
  });
