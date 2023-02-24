import './AuthForm.scss';
import Component from '../../core/Component';
import Button from '../button';
import Input from '../Input';

class AuthForm extends Component {
  init() {
    this.children.button = new Button({
      label: this.props.buttonLabel,
      type: 'submit',
    });

    this.children.inputs = this.props.inputsData.map(
      (data) =>
        new Input({
          ...data,
          onBlur: (str: string) => {
            const isCorrect = str.match(/[a-z]/);
            this.children.button.setProps({ disabled: isCorrect ? '' : 'disabled' });
            return isCorrect ? '' : 'Поле с ошибкой';
          },
        }),
    );

    this.props.events = {
      form: {
        submit(e) {
          e.preventDefault();
          console.log('submit');
        },
      },
      // на каждый блюр / фокус, 1)мы выполняем проверку всех инпутов и кнопки.
      // button.setProps('disabled') по every
      // 2) меняем пропсы ошибки для инпута
      // сложнее: при сабмите, для всех инпутов выполняем метод check?
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
