import profileFormTemplate from './profileForm.hbs';
import './profileForm.scss';
import formButton from '../../components/button';
import input from '../../components/profileInput';

const profileData = [
  { name: 'email', title: 'Почта', type: 'email', value: 'pochta@yandex.ru' },
  { name: 'login', title: 'Логин', type: 'text', value: 'ivanivanov' },
  { name: 'first_name', title: 'Имя', type: 'text', value: 'Иван' },
  { name: 'second_name', title: 'Фамилия', type: 'text', value: 'Иванов' },
  { name: 'display_name', title: 'Имя в чате', type: 'text', value: 'Иван' },
  { name: 'phone', title: 'Телефон', type: 'phone', value: '+7 (909) 967 30 30' },
];

const passwordData = [
  { name: 'oldPassword', title: 'Старый пароль', type: 'password' },
  { name: 'newPassword', title: 'Новый пароль', type: 'password' },
  { name: 'newPasswordRepeat', title: 'Повторите новый пароль', type: 'password' },
];

const button = formButton({ buttonText: 'Cохранить' });
const resolveInputs = (type) => {
  const inputs = type === 'profile' ? profileData : passwordData;
  return inputs.map((item) => input(item)).join('');
};

export default ({ type = 'profile' }) =>
  profileFormTemplate({ button, inputs: resolveInputs(type) });
