import './AuthForm.scss';
import Component from '../../core/Component';
import Button from '../button';
import Input from '../Input';
import { validateInput } from '../../utills/validation';

class AuthForm extends Component {
  get inputs() {
    return this.children.inputs;
  }

  init() {
    this.children.button = new Button({
      label: this.props.buttonLabel,
      type: 'submit',
    });

    this.children.inputs = this.props.inputsData.map(
      (data) =>
        new Input({
          ...data,
          onBlur: validateInput,
        }),
    );

    this.props.events = {
      form: {
        submit: (e) => {
          e.preventDefault();
          const isFormValid = this.inputs.every(({ value }) => validateInput(value));
          this.inputs.forEach((input) => input.checkValidity());

          if (isFormValid) {
            console.log(
              this.inputs.reduce((acc, { value, name }) => {
                acc[name] = value;
                return acc;
              }, {}),
            );
          }
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
