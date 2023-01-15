import authTemplate from './authForm.hbs';
import './authForm.scss';
import button from '../button';
import input from '../input';

export default ({ buttonText, inputsData, ...props }) => {
  return authTemplate({
    ...props,
    button: button({ buttonText }),
    inputs: inputsData.map((item) => input(item)).join(''),
  });
};
