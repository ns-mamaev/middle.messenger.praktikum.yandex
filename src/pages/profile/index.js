import profileTemplate from './profile.hbs';
import profileForm from '../../components/profileForm';
import './profile.scss';

export default (props = {}) =>
  profileTemplate({
    ...props,
    profileForm: () => profileForm({ type: 'profile' }),
  });
