import Component from '../../core/Component';

class InputError extends Component {
  render() {
    return '<span class="input__error">{{errorMessage}}</span>';
  }
}

export default InputError;
