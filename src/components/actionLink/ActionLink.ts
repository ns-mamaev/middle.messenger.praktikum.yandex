import Component from '../../core/Component';
import './ActionLink.scss';

export default class ActionLink extends Component {
  render() {
    return `
      <a href='{{href}}' class='action-link{{additionalClass}}'>
        {{ title }}
      </a>`;
  }
}
