import Component, { ComponentProps } from '../../core/Component';
import { validateInput, ValidationRules } from '../../utills/validation';
import Input from '../Input';
import { InputTypes } from '../Input/Input';
import InputError from '../InputError';
import './FormField.scss';

interface FormFieldProps extends ComponentProps {
  name: string;
  type?: InputTypes;
  required?: boolean;
  validationType?: ValidationRules;
}

export default class FormField extends Component {
  constructor(props: FormFieldProps) {
    const error = new InputError({
      errorMessage: '',
      classNames: 'form-field__error',
    });

    const input: Input = new Input({
      ...props,
      placeholder: ' ',
      classNames: 'form-field__input',
      events: {
        blur: (e: FocusEvent) => {
          const { value } = e.target as HTMLInputElement;
          const { message } = validateInput(value, props.validationType);
          error.setProps({ errorMessage: message });
        },
        focus: () => error.setProps({ errorMessage: '' }),
      },
    });

    super({
      ...props,
      input,
      error,
    });
  }

  render() {
    return `
    <li class="form-field">
      {{{input}}}
      <label class="form-field__label" for="{{name}}">{{placeholder}}</label>
      {{{error}}}
    </li>`;
  }
}
