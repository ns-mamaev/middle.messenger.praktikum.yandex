import buttonTemplate from './button.hbs';
import './button.scss';
import Block from '../../core/Block';

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

interface ButtonProps {
  type?: ButtonTypes;
  buttonText?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    const { buttonText, _id } = this.props;
    return this.compile(buttonTemplate, { buttonText });
  }
}
