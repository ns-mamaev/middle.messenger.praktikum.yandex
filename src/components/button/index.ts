import './button.scss';
import Component from '../../core/Component';

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

interface ButtonProps {
  type?: ButtonTypes;
  label?: string;
  events?: Record<string, (e: Event) => void>;
}

export default class Button extends Component {
  render() {
    return `
      <button type='{{type}}' class='button'>
        {{label}}
      </button>`;
  }
}
