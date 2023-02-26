import Component from '../../core/Component';
import './Message.scss';

export enum MessageTypes {
  TEXT = 'text',
  IMAGE = 'image',
}

export default class Message extends Component {
  render() {
    const { type, isRead, isOwn } = this.props;
    return `
      <li class="message ${isOwn ? 'message_own' : ''} ${
      type === MessageTypes.IMAGE ? 'message_type_image' : ''
    }">
        ${
          type === MessageTypes.IMAGE
            ? '<img class="message__image" src={{image}} alt="изображение"/>'
            : ''
        }
        ${type === MessageTypes.TEXT ? '<span class="message__text">{{text}}</span>' : ''}
        <div class="message__meta">
          ${isRead ? '<div class="message__flag"></div>' : ''}
          <span class="message__time">{{time}}</time>
        </div>
      </li>`;
  }
}
