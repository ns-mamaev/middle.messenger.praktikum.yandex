import registerTemplate from './register.hbs';
import './register.scss';
import authForm from '../../components/authForm';

const inputsData = [
  { name: 'email', placeholder: 'Почта', type: 'email' },
  { name: 'login', placeholder: 'Логин', type: 'text' },
  { name: 'first_name', placeholder: 'Имя', type: 'text' },
  { name: 'second_name', placeholder: 'Фамилия', type: 'text' },
  { name: 'phone', placeholder: 'Телефон', type: 'tel' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
  { name: 'password_repeat', placeholder: 'Пароль (ещё раз)', type: 'password' },
];

export default (props = {}) => registerTemplate({
  ...props,
  authForm: authForm({
    inputsData,
    buttonText: 'Зарегистрироваться',
    heading: 'Регистрация',
    link: { href: '#/signin', text: 'Войти' },
  }),
});
