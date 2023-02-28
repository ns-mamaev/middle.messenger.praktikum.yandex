import Component from '../../core/Component';
import './ActionLink.scss';

export default class ActionLink extends Component {
  render() {
    return `
      <button type='button' class='action-link {{classNames}}'>
        {{ title }}
      </button>`;
  }
}
