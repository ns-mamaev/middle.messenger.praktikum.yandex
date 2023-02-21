import './authForm.scss';
import Component from '../../core/Component';

class AuthForm extends Component {
  render() {
    return `
      <div class='auth-form'>
       <h2 class='auth-form__title'>{{heading}}</h2>
        <form class='auth-form__form'>
        <ul class='auth-form__inputs-list'>
          {{#each inputs}}
            {{{this}}}
          {{/each}}
        </ul>
          {{{button}}}
        </form>
        <a 
          class='auth-form__link'
          href='{{link.href}}'>
            {{link.text}}
          </a>
      </div>`;
  }
}

export default AuthForm;
