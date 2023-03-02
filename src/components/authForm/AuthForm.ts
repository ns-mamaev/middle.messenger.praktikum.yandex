import Component, { ComponentProps } from '../../core/Component';
import Form from '../Form';
import Button from '../Button';
import { ButtonTypes } from '../Button/Button';
import FormField from '../FormField';
import './AuthForm.scss';

interface AuthFormProps extends ComponentProps {
  heading: string;
  link: {
    href: string;
    label: string;
  };
  fields: FormField[];
}

class AuthForm extends Component {
  constructor({ fields, ...restProps }: AuthFormProps) {
    const form = new Form({
      button: new Button({
        label: 'Зарегистрироваться',
        type: ButtonTypes.SUBMIT,
      }),
      fields,
      formClassName: 'auth-form__form',
      listClassName: 'auth-form__inputs-list',
    });

    super({ ...restProps, form });
  }

  render() {
    return `
      <div class='auth-form'>
       <h2 class='auth-form__title'>{{heading}}</h2>
        {{{form}}}
        <a 
          class='auth-form__link'
          href='{{link.href}}'>
            {{link.label}}
          </a>
      </div>`;
  }
}

export default AuthForm;
