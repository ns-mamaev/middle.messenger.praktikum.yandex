import Component from '../../core/Component';
import InputError from '../InputError';
import './Input.scss';

class Input extends Component {
  get value() {
    return this.element.querySelector('input')?.value;
  }

  init() {
    this.children.error = new InputError({
      errorMessage: '',
    });

    this.props.events = {
      input: {
        blur: () => {
          this.children.error.setProps({ errorMessage: this.props.onBlur(this.value) });
        },
      },
    };
  }

  render() {
    return `
    <li class="input">
      <input
        class="input__field"
        id="{{name}}"
        name="{{name}}"
        type="{{type}}"
        placeholder=" "
        required
      >
      <label class="input__label" for="{{name}}">{{placeholder}}</label>
      {{{error}}}
    </li>`;
  }
}

export default Input;
