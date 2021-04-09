import { template } from 'underscore';
import Backbone from 'backbone';

import formUtils from '../utils/form';

export default Backbone.View.extend({
  tagName: 'li',

  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.ppfx = this.config.pStylePrefix || '';
    this.hiddenClass = this.ppfx + 'hidden';

    this.listenTo(this.model, 'change:name', this.render);
    this.listenTo(this.model, 'change:focused', this.render);
  },

  template: template(`
    <div class="layout-item <%= !!focused ?  'focused' : '' %>" data-role="open-page">
      <div>
        <span class="material-icons">
          insert_drive_file
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
  `),

  events: {
    'click [data-role="open-settings"]': 'openSettings',
    'click [data-role="toggle-options"]': 'toggleOptionsHandler',
    'click [data-role="open-page"]': 'openPage'
  },

  _getEditor() {
    const em = this.config.em;
    return em ? em.get('Editor') : '';
  },

  openSettings(event) {
    event.stopImmediatePropagation();

    formUtils.updatePageForm(this.model);
    this.toggleOptions(false);
  },

  openPage(event) {
    event.stopImmediatePropagation();

    const editor = this._getEditor();
    this.model.focus();
    editor.trigger('page:select', this.model);
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
