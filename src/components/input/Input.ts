import Component, { ComponentProps } from '../../core/Component';
import './Input.scss';

// class Input extends Component {
//   get value() {
//     return this.element.querySelector('input')?.value;
//   }

//   get name() {
//     return this.element.querySelector('input')?.name;
//   }

//   public checkValidity() {
//     const { result, message } = this.props.onValidate(this.value, this.props.validationType);
//     this.children.error.setProps({ errorMessage: message });
//     return result;
//   }

//   init() {
//     this.children.error = new InputError({
//       errorMessage: '',
//       classNames: 'input__error',
//     });

//     this.props.events = {
//       input: {
//         blur: () => {
//           this.checkValidity();
//         },
//         focus: () => this.children.error.setProps({ errorMessage: '' }),
//       },
//     };
//   }

//   render() {
//     return `
//     <li class="input">
//       <input
//         class="input__field"
//         id="{{name}}"
//         name="{{name}}"
//         type="{{type}}"
//         placeholder=" "
//         required
//       >
//       <label class="input__label" for="{{name}}">{{placeholder}}</label>
//       {{{error}}}
//     </li>`;
//   }
// }

// export default Input;

export enum InputTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEL = 'tel',
}

interface InputProps extends ComponentProps {
  classNames: string;
  type?: InputTypes;
  required?: boolean;
  name: string;
  placeholder?: string;
}

export default class Input extends Component {
  constructor({ type = InputTypes.TEXT, required = false, ...restProps }: InputProps) {
    super({
      type,
      ...restProps,
    });
  }

  public get value() {
    return (this.element as HTMLInputElement).value;
  }

  public get name() {
    return (this.element as HTMLInputElement).name;
  }

  render() {
    return `
      <input
        class="{{classNames}}"
        id="{{name}}"
        name="{{name}}"
        type="{{type}}"
        placeholder="{{placeholder}}"
        {{required}}
      >`;
  }
}
