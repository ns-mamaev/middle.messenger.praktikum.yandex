import Component from '../../core/Component';
import './ProfilePage.scss';

export default class ProfilePage extends Component {
  init() {}
  render() {
    return `
      <section class="profile-page">
        <div class="profile-page__side-panel">
          <a title="назад к чатам" href="#/" class="profile-page__back-link"></a>
        </div>
        <div class="profile-page__main-content">
          <div class="profile-page__avatar"></div>
          <h2 class="profile-page__profile-name">{{profileName}}</h2>
          {{{profileForm}}}
          <ul class="profile-page__actions">
            {{{actions}}}
          </ul>
        </div>
      </section>`;
  }
}
