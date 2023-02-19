import template from './authForm.hbs';
import './authForm.scss';
import Component from '../../core/Component';

class AuthForm extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export default AuthForm;
