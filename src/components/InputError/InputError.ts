import Component from '../../core/Component';

class InputError extends Component {
  render() {
    return '<span class="{{classNames}}">{{errorMessage}}</span>';
  }
}

export default InputError;
