import buttonTemplate from './button.hbs';
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
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(buttonTemplate, this.props);
  }
}
