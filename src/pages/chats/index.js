import chatsTemplate from './chats.hbs';
import chatItem from '../../components/chat';
import './chats.scss';

const chatsData = [
  { title: 'Иван', message: 'Привет, как идет работа над проектом?', time: '10:20', counter: 2 },
  {
    title: 'Пётр',
    message:
      'Образец очень длинного сообщения, которое даже не думает помещаться в заготовленный контейнер',
    time: '11:30',
    counter: 1,
  },
  {
    title: 'Василий',
    message: 'АУ! Ответишь наконец?',
    time: 'Вс',
    counter: 5,
  },
];

export default (props = {}) =>
  chatsTemplate({ ...props, chatsList: chatsData.map((item) => chatItem(item)) });
