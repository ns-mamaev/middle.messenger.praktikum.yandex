import tpl from './tpl.hbs';
import './style.scss';
import authForm from '../../components/authForm';

const inputs = [
  { name: 'email', placeholder: 'Почта', type: 'email' },
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'first_name', placeholder: 'Имя', type: 'text' },
  { name: 'second_name', placeholder: 'Фамилия', type: 'text' },
  { name: 'phone', placeholder: 'Телефон', type: 'tel' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
  { name: 'password_repeat', placeholder: 'Пароль (ещё раз)', type: 'password' },
];

export default (props = {}) =>
  tpl({
    ...props,
    inputs,
    buttonText: 'Зарегистрироваться',
    heading: 'Регистрация',
    link: { href: '#/signin', text: 'Войти' },
  });
