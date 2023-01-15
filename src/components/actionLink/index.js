import linkTemplate from './actionLink.hbs';
import './actionLink.scss';

export default ({ dangerType, ...restProps }) => {
  const additionalClass = dangerType ? ' action-link_type_danger' : '';
  return linkTemplate({
    additionalClass,
    ...restProps,
  });
};
