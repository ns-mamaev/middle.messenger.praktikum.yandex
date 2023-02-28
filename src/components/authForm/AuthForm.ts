import './AuthForm.scss';
import Component from '../../core/Component';
import Button from '../button';

class AuthForm extends Component {
  get inputs() {
    return this.children.inputs;
  }

  init() {
    this.children.button = new Button({
      label: this.props.buttonLabel,
      type: 'submit',
    });

    this.props.events = {
      form: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          this.props.onSubmit();
        },
      },
    };
  }

  render() {
    return `
      <div class='auth-form'>
       <h2 class='auth-form__title'>{{heading}}</h2>
        <form class='auth-form__form' novalidate>
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
