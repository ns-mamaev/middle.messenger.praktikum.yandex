import Component from '../../core/Component';
import './ProfileInput.scss';

export default class ProfileInput extends Component {
  render() {
    return `
      <li class="profile-input">
        <label class="profile-input__label" for="{{name}}">{{title}}</label>
        <input 
          class="profile-input__input"
          id="{{name}}"
          name="{{name}}"
          type="{{type}}"
          placeholder=' '
          required
          value="{{value}}"
          {{disabled}}
        >
      </li>`;
  }
}
