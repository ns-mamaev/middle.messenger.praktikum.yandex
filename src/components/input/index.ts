import Component from '../../core/Component';
import './input.scss';

class Input extends Component {
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
      <span class="input__error"></span>
    </li>`;
  }
}

export default Input;
