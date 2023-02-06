import profileFormTemplate from './profileForm.hbs';
import './profileForm.scss';
// import formButton from '../button';
// import input from '../profileInput';

// const profileData = [
//   {
//     name: 'email', title: 'Почта', type: 'email', value: 'pochta@yandex.ru',
//   },
//   {
//     name: 'login', title: 'Логин', type: 'text', value: 'ivanivanov',
//   },
//   {
//     name: 'first_name', title: 'Имя', type: 'text', value: 'Иван',
//   },
//   {
//     name: 'second_name', title: 'Фамилия', type: 'text', value: 'Иванов',
//   },
//   {
//     name: 'display_name', title: 'Имя в чате', type: 'text', value: 'Иван',
//   },
//   {
//     name: 'phone', title: 'Телефон', type: 'phone', value: '+7 (909) 967 30 30',
//   },
// ];

// const passwordData = [
//   { name: 'oldPassword', title: 'Старый пароль', type: 'password' },
//   { name: 'newPassword', title: 'Новый пароль', type: 'password' },
//   { name: 'newPasswordRepeat', title: 'Повторите новый пароль', type: 'password' },
// ];

// const resolveInputs = (type) => {
//   const inputs = type === 'passwordEdit' ? passwordData : profileData;
//   return inputs.map((item) => input(item)).join('');
// };

// const resolveButton = (type) => (type === 'profile' ? null : formButton({ buttonText: 'Сохранить' }));

// export default ({ type }) => profileFormTemplate({
//   button: resolveButton(type),
//   inputs: resolveInputs(type),
// });

import Block from '../../core/Block';

export default class Profile extends Block {
  constructor(props) {
    super('section', props);
  }

  render() {
    const { text = '', button } = this.props;
    return this.compile(profileFormTemplate, { text, button });
  }
}
