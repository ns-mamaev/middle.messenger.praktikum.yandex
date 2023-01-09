import tpl from './tpl.hbs';
import './style.scss';

export default ({ chatName, lastMessage }) => tpl({ chatName, lastMessage });
