import Component, { ComponentProps } from '../../core/Component';
import { cn } from '../../utills/classNames';
import Button from '../Button';
import './Form.scss';

// унифицированный компонент для всех форм в проекте

interface FormProps extends ComponentProps {
  button?: Button;
  fields: any;
  formClassName?: string;
  listClassName?: string;
}

export default class Form extends Component {
  constructor(props: FormProps) {
    props.events = {
      submit: (e: SubmitEvent) => {
        onSubmit();
      },
    };

    super(props);
  }

  render() {
    const { formClassName, listClassName } = this.props;
    return `
      <form class="${cn('form', {}, [formClassName])}" novalidte>
        <ul class="${cn('form__list', {}, [listClassName])}">
          {{#each fields}}
            {{{this}}}
          {{/each}}
        </ul>
        {{{button}}}
      </form>`;
  }
}
