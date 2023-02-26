import Component from '../../core/Component';
import ActionPopup from '../ActionPopup';
import fileIcon from '../../../static/file.svg';
import photoIcon from '../../../static/photo.svg';
import locationIcon from '../../../static/location.svg';
import addUserIcon from '../../../static/icon-add.svg';
import removeUserIcon from '../../../static/icon-remove.svg';
import Message, { MessageTypes } from '../Message';
import picture from '../../../static/picture.jpg';
import './ChatsWindow.scss';
import gooseHorizontal from '../../../static/goose.jpg';
import gooseVertical from '../../../static/goose-vert.jpg';
import gooseSmall from '../../../static/goose-small.jpg';

const messagesData = [
  {
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
    time: '11:56',
    type: MessageTypes.TEXT,
    isOwn: false,
  },
  {
    text: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    time: '11:56',
    type: MessageTypes.TEXT,
    isOwn: false,
  },
  {
    image: picture,
    time: '11:56',
    type: MessageTypes.IMAGE,
    isOwn: false,
  },
  {
    text: 'Круто!',
    time: '12:00',
    type: MessageTypes.TEXT,
    isOwn: true,
    isRead: true,
  },
  {
    text: 'Вот смотри, я тебе присылаю гусей',
    time: '12:01',
    type: MessageTypes.TEXT,
    isOwn: true,
    isRead: true,
  },
  {
    text: 'Совершенно разные картинки, чтобы можно было проверить верстку на предмет наличия ошибок',
    time: '12:01',
    type: MessageTypes.TEXT,
    isOwn: true,
    isRead: true,
  },
  {
    text: 'Го',
    time: '12:02',
    type: MessageTypes.TEXT,
    isOwn: false,
  },
  {
    image: gooseHorizontal,
    time: '12:04',
    type: MessageTypes.IMAGE,
    isOwn: true,
    isRead: true,
  },
  {
    text: 'Хороши, держи ответочку',
    time: '12:02',
    type: MessageTypes.TEXT,
    isOwn: false,
  },
  {
    image: gooseVertical,
    time: '12:04',
    type: MessageTypes.IMAGE,
    isOwn: false,
  },
  {
    image: gooseSmall,
    time: '12:04',
    type: MessageTypes.IMAGE,
    isOwn: true,
    isRead: true,
  },
];

export default class ChatsWindow extends Component {
  init() {
    const attachPopup = new ActionPopup({
      classNames: 'chats-window__popup-attach',
      items: [
        { label: 'Фото или Видео', img: photoIcon, id: 'photo' },
        { label: 'Файл', img: fileIcon, id: 'file' },
        { label: 'Локация', img: locationIcon, id: 'location' },
      ],

      // пока просто закрываю, т.к реализации вложения в данном спринте не предусмотрено
      events: {
        root: {
          click: () => attachPopup.hide(),
        },
      },
    });

    this.children.attachPopup = attachPopup;

    const userPopup = new ActionPopup({
      classNames: 'chats-window__popup-user',
      items: [
        { label: 'Добавить пользователя', img: addUserIcon, id: 'add-user' },
        { label: 'Удалить пользователя', img: removeUserIcon, id: 'remove-user' },
      ],
      events: {
        '#add-user': {
          click: () => {
            userPopup.hide();
            this.props.onOpenAddUserModal();
          },
        },
        '#remove-user': {
          click: () => {
            userPopup.hide();
            this.props.onOpenRemoveUserModal();
          },
        },
      },
    });

    this.children.userPopup = userPopup;

    this.children.messages = messagesData.map((data) => new Message({ ...data }));

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
        <div class="chats-window__messages-area">
          <p class="chats-window__date">1 марта</p>
          <ul class="chats-window__messages">
            {{#each messages}}
              {{{this}}}
            {{/each}}
          </ul>
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
