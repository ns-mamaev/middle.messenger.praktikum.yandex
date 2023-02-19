import Component from '../../core/Component';
import template from './input.hbs';
import './input.scss';

class Input extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
