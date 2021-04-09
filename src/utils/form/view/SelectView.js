import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  events: {
    'change select': 'changed'
  },
  template: template(`
    
    <div class="<%= ppfx %>input-controls <%= ppfx %>four-color">
      <label for="<%= id %>"><%= label %></label>
      <div class="<%= ppfx %>input-field">
        <select id="<%= id %>" name="<%= name %>">
          <option value="">None</option>
        </select>
      </div>
    </div>
  `),

  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.model = opts.model;
    this.ppfx = this.config.pStylePrefix || '';

    this.options = this.model.get('options');

    this.listenTo(this.options, 'add', this.addOption);
  },

  changed: function(evt) {
    console.log('select changed');
    const value = evt.target.value;
    this.model.set('value', value, { silent: true });
  },

  addOption(option) {
    const selected =
      option.get('id') === this.model.get('value') ? 'selected' : '';
    this.$el
      .find('select')
      .append(
        `<option value="${option.get('id')}" ${selected} >${option.get(
          'name'
        )}</option>`
      );
  },

  render() {
    this.$el.html(this.template({ ...this.model.toJSON(), ppfx: this.ppfx }));

    this.options.forEach(model => this.addOption(model));

    return this;
  }
});
