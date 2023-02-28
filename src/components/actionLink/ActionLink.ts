import Component from '../../core/Component';
import './ActionLink.scss';

export default class ActionLink extends Component {
  init() {
    this.props.events = {
      root: {
        click: this.props.onClick,
      },
    };
  }
  render() {
    return `
      <button type='button' class='action-link {{classNames}}'>
        {{ title }}
      </button>`;
  }
}
