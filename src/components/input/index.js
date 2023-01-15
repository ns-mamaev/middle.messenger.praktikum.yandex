import Handlebars from 'handlebars';
import inputTemplate from './input.hbs';
import './input.scss';

Handlebars.registerPartial('input', inputTemplate);

export default (props = {}) => inputTemplate(props);
