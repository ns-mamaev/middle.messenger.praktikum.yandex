import template from './authForm.hbs';
import './authForm.scss';
import Component from '../../core/Component';

class AuthForm extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default AuthForm;

// ({ buttonText, inputsData, ...props }) => authTemplate({
//   ...props,
//   button: button({ buttonText }),
//   inputs: inputsData.map((item) => input(item)).join(''),
// });
