import ActionLink from '../../components/ActionLink';
import Button from '../../components/button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import ProfileForm from '../../components/ProfileForm';
import ProfileInput from '../../components/ProfileInput';
import Component from '../../core/Component';
import './ProfilePage.scss';

const profileData = [
  {
    name: 'email',
    title: 'Почта',
    type: 'email',
    value: 'pochta@yandex.ru',
  },
  {
    name: 'login',
    title: 'Логин',
    type: 'text',
    value: 'ivanivanov',
  },
  {
    name: 'first_name',
    title: 'Имя',
    type: 'text',
    value: 'Иван',
  },
  {
    name: 'second_name',
    title: 'Фамилия',
    type: 'text',
    value: 'Иванов',
  },
  {
    name: 'display_name',
    title: 'Имя в чате',
    type: 'text',
    value: 'Иван',
  },
  {
    name: 'phone',
    title: 'Телефон',
    type: 'phone',
    value: '+79099673030',
  },
];

const passwordData = [
  { name: 'oldPassword', title: 'Старый пароль', type: 'password' },
  { name: 'newPassword', title: 'Новый пароль', type: 'password' },
  { name: 'newPasswordRepeat', title: 'Повторите новый пароль', type: 'password' },
];

enum FormMode {
  DEFAULT = 'default',
  PROFILE_EDIT = 'profile-edit',
  PASSWORD_EDIT = 'password-edit',
}

export default class ProfilePage extends Component {
  constructor(props) {
    super({ ...props, mode: FormMode.DEFAULT });
  }
  init() {
    this.children.profileForm = new ProfileForm({
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
      }),
      inputs: profileData.map((data) => new ProfileInput({ ...data })),
    });
    this.children.passwordForm = new ProfileForm({
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
      }),
      inputs: passwordData.map((data) => new ProfileInput({ ...data })),
    });
    this.props.profileName = 'Иван';
    this.children.avatarModal = new Modal({
      title: 'Загрузите файл',
      button: new Button({
        label: 'Поменять',
      }),
      inputs: [new Input({ type: 'file' })],
    });

    this.children.actions = [
      new ActionLink({
        title: 'Изменить данные',
        onClick: () => this.setProps({ mode: FormMode.PROFILE_EDIT }),
      }),
      new ActionLink({
        title: 'Изменить пароль',
        onClick: () => this.setProps({ mode: FormMode.PASSWORD_EDIT }),
      }),
      new ActionLink({
        title: 'Выйти',
        classNames: 'action-link_type_danger',
      }),
    ];

    this.props.events = {
      '.profile-page__avatar': {
        click: () => this.children.avatarModal.show(),
      },
    };
  }
  render() {
    const { mode } = this.props;
    return `
      <section class="profile-page">
        <div class="profile-page__side-panel">
          <a title="назад к чатам" href="#/" class="profile-page__back-link"></a>
        </div>
        <div class="profile-page__main-content">
          <button class="profile-page__avatar">
            <span class="profile-page__avatar-inner">Поменять аватар<span>
          </button>
          <h2 class="profile-page__profile-name">{{profileName}}</h2>
          ${mode === FormMode.DEFAULT || mode === FormMode.PROFILE_EDIT ? '{{{profileForm}}}' : ''}
          ${mode === FormMode.PASSWORD_EDIT ? '{{{passwordForm}}}' : ''}
          ${
            mode === FormMode.DEFAULT
              ? `<ul class="profile-page__actions">
                  {{#each actions}}
                     {{{this}}}
                  {{/each}}
                  </ul>`
              : ''
          }
        </div>
        {{{avatarModal}}}
      </section>`;
  }
}
