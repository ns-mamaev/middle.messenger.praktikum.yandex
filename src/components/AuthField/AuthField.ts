import Component from '../../core/Component';
import Input from '../Input';
import './AuthField.scss';

class AuthField extends Component {
  get value() {
    return this.children.input.value;
  }

  init() {
    this.children.input = new Input({
      ...this.props,
      classNames: 'auth-field__field',
    });
  }

  render() {
    return `
    <li class="auth-field">
      {{{input}}}
      <label class="auth-field__label" for="{{name}}">{{placeholder}}</label>
      <span class="auth-field__error"></span>
    </li>`;
  }
}

export default AuthField;
