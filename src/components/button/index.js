import Handlebars from 'handlebars';
import buttonTemplate from './button.hbs';
import './button.scss';

Handlebars.registerPartial('button', buttonTemplate);

export default (props = {}) => inputTemplate(props);
