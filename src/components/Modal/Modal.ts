import Component from '../../core/Component';
import './Modal.scss';

export default class Modal extends Component {
  init() {
    this.props.events = {
      root: {
        // закрытие по клику на оверлей
        mousedown: (e: MouseEvent) => {
          if (e.target === e.currentTarget) {
            this.hide();
          }
        },
      },
      form: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
        },
      },
    };
  }

  render() {
    return `
      <div class="modal">
        <div class="modal__inner">
          <h4 class="modal__title">{{title}}</h4>
          <form class="modal__form" novalidate>
          <ul class="modal__inputs">
            {{#each inputs}}
              {{{this}}}
            {{/each}}
          </ul>
            {{{button}}}
          </form>
      </div>`;
  }
}
