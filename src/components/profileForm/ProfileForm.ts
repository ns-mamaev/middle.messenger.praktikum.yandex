import Component from '../../core/Component';
import './ProfileForm.scss';

export default class ProfileForm extends Component {
  render() {
    return `
      <form class='profile-form'>
        <ul class='profile-form__inputs'>
          {{#each inputs}}
            {{{this}}}
          {{/each}}
        </ul>
        {{{button}}}
      </form>
    `;
  }
}
