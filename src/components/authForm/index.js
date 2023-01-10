import Handlebars from 'handlebars';
import authTemplate from './authForm.hbs';
import './authForm.scss';
import input from '../input';
import button from '../button';

Handlebars.registerPartial('authForm', authTemplate);

export default (props = {}) => authTemplate(props);
