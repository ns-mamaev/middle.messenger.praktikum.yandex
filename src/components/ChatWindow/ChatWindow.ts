import Component from '../../core/Component';
import ActionPopup from '../ActionPopup';
import './ChatsWindow.scss';
import fileIcon from '../../../static/file.svg';
import photoIcon from '../../../static/photo.svg';
import locationIcon from '../../../static/location.svg';

export default class ChatsWindow extends Component {
  init() {
    this.children.attachPopup = new ActionPopup({
      classNames: 'chats-window__popup-attach',
      items: [
        { label: 'Фото или Видео', img: photoIcon },
        { label: 'Файл', img: fileIcon },
        { label: 'Локация', img: locationIcon },
      ],
    });

    this.children.userPopup = new ActionPopup({
      classNames: 'chats-window__popup-user',
      items: [
        { label: 'Добавить пользователя', img: photoIcon },
        { label: 'Удалить пользователя', img: fileIcon },
      ],
    });

    this.props.events = {
      '.chats-window__action-btn': {
        click: this.props.onOpenAddUserModal,
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
