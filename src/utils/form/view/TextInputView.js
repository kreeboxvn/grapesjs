import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  events: {
    'change input': 'changed'
  },
  template: template(`
    <div class="<%= ppfx %>input-controls <%= ppfx %>four-color">
        <label for="<%= id %>"><%= label %></label>
        <div class="<%= ppfx %>input-field">
            <input id=<%= id %> type="text" name="<%= name %>" value="<%= value %>" data-type="<%= type %>"/>
        </div>
    </div>
  `),
  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.model = opts.model;
    this.ppfx = this.config.pStylePrefix || '';

    this.listenTo(this.model, 'change', this.render);
  },

  changed: function(evt) {
    console.log('input changed');
    const value = evt.target.value;
    this.model.set('value', value, { silent: true });
  },

  render() {
    console.log('input rendered');
    const model = this.model;
    this.$el.html(
      this.template({
        ...model.toJSON(),
        ppfx: this.ppfx
      })
    );
    return this;
  }
});
