import Component from '../../core/Component';
import ActionPopup from '../ActionPopup';
import './ChatsWindow.scss';
import fileIcon from '../../../static/file.svg';
import photoIcon from '../../../static/photo.svg';
import locationIcon from '../../../static/location.svg';
import addUserIcon from '../../../static/icon-add.svg';
import removeUserIcon from '../../../static/icon-remove.svg';

const attachPopup = new ActionPopup({
  classNames: 'chats-window__popup-attach',
  items: [
    { label: 'Фото или Видео', img: photoIcon, id: 'photo' },
    { label: 'Файл', img: fileIcon, id: 'file' },
    { label: 'Локация', img: locationIcon, id: 'location' },
  ],
});

export default class ChatsWindow extends Component {
  init() {
    this.children.attachPopup = attachPopup;

    const userPopup = new ActionPopup({
      classNames: 'chats-window__popup-user',
      items: [
        { label: 'Добавить пользователя', img: addUserIcon, id: 'add-user' },
        { label: 'Удалить пользователя', img: removeUserIcon, id: 'remove-user' },
      ],
      events: {
        '#add-user': {
          click: this.props.onOpenAddUserModal,
        },
        '#remove-user': {
          click: this.props.onOpenRemoveUserModal,
        },
      },
    });

    this.children.userPopup = userPopup;

    this.props.events = {
      '.chats-window__action-btn': {
        click: () => userPopup.show(),
      },
      '.chats-window__attach-btn': {
        click: () => attachPopup.show(),
      },
    };
  }

  render() {
    return `
      <section class="chats-window">
        <div class="chats-window__chat-header">
          {{{userPopup}}}
          <div class="chats-window__chat-avatar"></div>
          <h2 class="chats-window__chat-title">Иван</h2>
          <button type="button" class="chats-window__action-btn"></button>
        </div>
        <div class="chats-window__messages">
          В настоящий момент страница не обладает полноценным функционалом,
          а работает как статичная заглушка. Кликабельна только ссылка на профиль
        </div>
        <div class="chats-window__input-area">
          {{{attachPopup}}}
          <button class="chats-window__attach-btn"></button>
          <input type="text" class="chats-window__message-input" placeholder="Сообщение">
          <button class="chats-window__send-btn" type="button"></button>
        </div>
      </section>`;
  }
}
