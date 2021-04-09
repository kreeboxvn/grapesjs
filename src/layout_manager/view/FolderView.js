import { template } from 'underscore';
import Backbone from 'backbone';

import formUtils from '../utils/form';

export default Backbone.View.extend({
  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.ppfx = this.config.pStylePrefix || '';
    this.hiddenClass = this.ppfx + 'hidden';

    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'li',

  template: template(`
    <div class="layout-item" data-id="<%= id %>">
      <div>
        <span class="material-icons">
          folder_open
        </span>
        <span data-role="name"><%= name %></span>    
      </div>
      <div class="more-options" data-role="toggle-options">
        <span class="material-icons">
          more_horiz
        </span>
        <ul class="options-list <%= ppfx %>one-bg <%= ppfx %>hidden" data-role="options">
          <li data-role="open-settings">Settings</li>
        </ul>
      </div>
    </div>
    <ul id="folder-children-<%= id %>">
      </ul>
  `),

  events: {
    'click [data-role="open-settings"]': 'openSettings',
    'click [data-role="toggle-options"]': 'toggleOptionsHandler'
  },

  _getEditor() {
    const em = this.config.em;
    return em ? em.get('Editor') : '';
  },

  updateName() {
    this.$el
      .find(`[data-id="${this.model.get('id')}"] > [data-role="name"]`)
      .html(this.model.get('name'));
  },

  openSettings(event) {
    event.stopImmediatePropagation();

    formUtils.updateFolderForm(this.model);
    this.toggleOptions(false);
  },

  toggleOptionsHandler(event) {
    event.stopImmediatePropagation();

    this.toggleOptions();
  },

  toggleOptions(status) {
    const options = this.$el.find('[data-role="options"]');

    if (typeof status === 'undefined') {
      options.toggleClass(this.hiddenClass);
      return;
    }

    if (status) {
      options.removeClass(this.hiddenClass);
    } else {
      options.addClass(this.hiddenClass);
    }
  },

  render() {
    this.$el.html(this.template({ ...this.model.toJSON(), ppfx: this.ppfx }));

    return this;
  }
});
