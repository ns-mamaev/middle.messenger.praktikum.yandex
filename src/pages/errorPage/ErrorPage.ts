import Component from '../../core/Component';
import './ErrorPage.scss';

class ErrorPage extends Component {
  protected init(): void {
    this.props.errorCode = 500;
    (this.props.errorText = 'Мы уже фиксим'), (this.props.link = '#/');
    this.props.linkText = 'Назад к чатам';
  }
  render() {
    return `
      <div class="error-page">
        <h2 class="error-page__title">{{errorCode}}</h2>
        <p class="error-page__subtitle">{{errorText}}</p>
        <a class="error-page__back-link" href="{{link}}">{{linkText}}</a>
      </div>`;
  }
}

export default ErrorPage;
