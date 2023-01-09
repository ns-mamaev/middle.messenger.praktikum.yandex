import tpl from './tpl.hbs';
import chat from './components/chat';

const chatsData = [
  { chatName: 'Иван', lastMessage: 'Скоро ответите?' },
  { chatName: 'BestForex', lastMessage: 'Вам интересна торговля на бирже?' },
  { chatName: '8-800-555-35-34', lastMessage: 'Займы до 1млн за 10 мин' },
];

const root = document.getElementById('root');
root.innerHTML = tpl({ username: 'Алексей' });

chatsData.forEach((chatData) => root.insertAdjacentHTML('beforeend', chat(chatData)));
