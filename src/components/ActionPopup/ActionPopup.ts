import Component from '../../core/Component';
import './ActionPopup.scss';

export default class ActionPopup extends Component {
  render() {
    return `
      <ul class='action-popup {{classNames}}'>
        {{#each items}}
          <li class='action-popup__item' id={{this.id}}>
            <img class='action-popup__item-img' alt={{this.label}} src={{this.img}} />
            <span class='action-popup__item-label'>{{this.label}}</span>
          </li>
        {{/each}}
      </ul>`;
  }
}
