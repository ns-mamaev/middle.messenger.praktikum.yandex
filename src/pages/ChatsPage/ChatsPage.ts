import Button from '../../components/Button';
import Chat from '../../components/Chat';
import ChatsList from '../../components/ChatsList';
import ChatsWindow from '../../components/ChatWindow';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Component from '../../core/Component';
import { validateInput, ValidationRules } from '../../utills/validation';
import './ChatsPage.scss';

type ChatsData = {
  id: number;
  title: string;
  message: string;
  time: string;
  counter: number;
  active?: boolean;
};

const chatsData: ChatsData[] = [
  {
    id: 1,
    title: 'Иван',
    message: 'Привет, как идет работа над проектом?',
    time: '10:20',
    counter: 2,
  },
  {
    id: 2,
    title: 'Пётр',
    message: `Образец очень длинного сообщения,
      которое даже не думает помещаться в заготовленный контейнер`,
    time: '11:30',
    counter: 4,
    active: true,
  },
  {
    id: 3,
    title: 'Василий',
    message: 'АУ! Ответишь наконец?',
    time: 'Вс',
    counter: 5,
  },
  {
    id: 4,
    title: 'Василий',
    message: 'АУ! Ответишь наконец?',
    time: 'Вс',
    counter: 1,
  },
];

const addUserModal = new Modal({
  title: 'Добавить пользователя',
  inputs: [
    new Input({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      validationType: ValidationRules.LOGIN,
      onValidate: validateInput,
    }),
  ],
  button: new Button({
    label: 'Добавить',
  }),
});

const removeUserModal = new Modal({
  title: 'Удалить пользователя',
  inputs: [
    new Input({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      validationType: ValidationRules.LOGIN,
      onValidate: validateInput,
    }),
  ],
  button: new Button({
    label: 'Удалить',
  }),
});

export default class ChatsPage extends Component {
  init() {
    this.children.chatsList = new ChatsList({
      chats: chatsData.map((data) => new Chat({ ...data })),
    });
    this.children.chatsWindow = new ChatsWindow({
      onOpenAddUserModal: () => addUserModal.show(),
      onOpenRemoveUserModal: () => removeUserModal.show(),
    });
    this.children.addUserModal = addUserModal;
    this.children.removeUserModal = removeUserModal;
  }

  render() {
    return `
      <div class="chats">
        <section class="chats__side-panel">
          <a class="chats__profile-link" href="#/profile">Профиль</a>
          <input type="text" class="chats__search-field" placeholder="Поиск">
          {{{chatsList}}}
        </section>
        {{{chatsWindow}}}
        {{{addUserModal}}}
        {{{removeUserModal}}}
      </div>`;
  }
}
