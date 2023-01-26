import profileTemplate from './profile.hbs';
import profileForm from '../../components/profileForm';
import actionLink from '../../components/actionLink';
import './profile.scss';

const links = [
  { title: 'Изменить данные', href: '#/profile-edit' },
  { title: 'Изменить пароль', href: '#/password-edit' },
  { title: 'Выйти', href: '#/signin', dangerType: true },
];

const actionLinks = links.map((link) => actionLink(link)).join('');

export default ({ type, ...props }) => profileTemplate({
  ...props,
  profileName: type === 'profile' ? 'Иван' : '',
  profileForm: () => profileForm({ type }),
  actionLinks: type === 'profile' ? actionLinks : null,
});
