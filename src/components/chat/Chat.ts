import Component from '../../core/Component';
import './Chat.scss';

export default class Chat extends Component {
  render() {
    return `
      <li class="chat-item ${this.props.active ? 'chat-item_active' : ''}">
        <h4 class="chat-item__title">{{title}}</h4>
        <p class="chat-item__message">{{message}}</p>
        <div class="chat-item__avatar"></div>
        <span class="chat-item__time">{{time}}</span>
        ${this.props.counter > 0 ? '<span class="chat-item__counter">{{counter}}</span>' : ''}
      </li>`;
  }
}
