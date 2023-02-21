// import chatItem from '../../components/chat';
import Chat from '../../components/Chat';
import Component from '../../core/Component';
import './ChatsPage.scss';

const chatsData = [
  {
    title: 'Иван',
    message: 'Привет, как идет работа над проектом?',
    time: '10:20',
    counter: 2,
  },
  {
    title: 'Пётр',
    message: `Образец очень длинного сообщения,
      которое даже не думает помещаться в заготовленный контейнер`,
    time: '11:30',
    counter: 4,
    active: true,
  },
  {
    title: 'Василий',
    message: 'АУ! Ответишь наконец?',
    time: 'Вс',
    counter: 5,
  },
  {
    title: 'Василий',
    message: 'АУ! Ответишь наконец?',
    time: 'Вс',
    counter: 1,
  },
];

export default class ChatsPage extends Component {
  init() {
    this.children.chatList = chatsData.map((item) => new Chat({ ...item }));
  }

  render() {
    return `
      <div class="chats">
        <section class="chats__side-panel">
          <a class="chats__profile-link" href="#/profile">Профиль</a>
          <input type="text" class="chats__search-field" placeholder="Поиск">
          <ul class="chats__chats-list">
            {{#each chatList}}
              {{{this}}}
            {{/each}}
          </ul>
        </section>
        <section class="chats__main-area">
          <div class="chats__chat-header">
            <div class="chats__chat-avatar"></div>
            <h2 class="chats__chat-title">Иван</h2>
            <button type="button" class="chats__action-btn"></button>
          </div>
          <div class="chats__messages">
            В настоящий момент страница не обладает полноценным функционалом,
            а работает как статичная заглушка. Кликабельна только ссылка на профиль
          </div>
          <div class="chats__input-area">
            <button class="chats__attach-btn"></button>
            <input type="text" class="chats__message-input" placeholder="Сообщение">
            <button class="chats__send-btn" type="button"></button>
          </div>
        </section>
      </div>`;
  }
}
