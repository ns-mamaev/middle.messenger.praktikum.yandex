import './Button.scss';
import Component, { ComponentProps } from '../../core/Component';

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

interface ButtonProps extends ComponentProps {
  type?: ButtonTypes;
  label: string;
}

export default class Button extends Component {
  constructor({ type = ButtonTypes.BUTTON, ...restProps }: ButtonProps) {
    super({ type, ...restProps });
  }

  render() {
    return `
      <button type='{{type}}' class='button'>
        {{label}}
      </button>`;
  }
}
