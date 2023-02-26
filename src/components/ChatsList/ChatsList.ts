import Component from '../../core/Component';
import './ChatsList.scss';

export default class ChatsList extends Component {
  render() {
    return `
      <ul class="chats__chats-list">
        {{#each chats}}
          {{{this}}}
        {{/each}}
      </ul>`;
  }
}
