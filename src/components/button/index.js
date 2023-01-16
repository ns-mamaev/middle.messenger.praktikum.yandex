import buttonTemplate from './button.hbs';
import './button.scss';

export default ({ buttonText, type = 'button' }) => buttonTemplate({ buttonText, type });
