import Component, { ComponentProps } from '../../core/Component';

interface InputErrorProps extends ComponentProps {
  errorMessage: string;
  classNames?: string;
}

class InputError extends Component {
  constructor(props: InputErrorProps) {
    super(props);
  }

  render() {
    return '<span class="{{classNames}}">{{errorMessage}}</span>';
  }
}

export default InputError;
