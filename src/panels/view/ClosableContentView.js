import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  initialize(o) {
    var cls = this.model.get('className');
    this.config = o.config || {};
    this.em = this.config.em || {};
    const pfx = this.config.stylePrefix || '';
    this.pfx = pfx + 'closable-content-';
    this.ppfx = this.config.pStylePrefix || '';
    this.id = this.pfx + this.model.get('id');
    this.activeCls = 'active';
    this.className = this.pfx + 'container' + (cls ? ' ' + cls : '');
    this.listenTo(this.model, 'close', this.close);
    this.listenTo(this.model, 'change:active', this.updateActive);
  },

  events: { 'click .close': 'close' },

  template: template(`
    <div class="<%= pfx %>header" >
        <h3><%= label %></h3>
        <span class="close"><i class="fa fa-times"></i></span>
    </div>
    <div class="<%= pfx %>main" data-role="main"></div>
  `),

  close() {
    const { model } = this;
    const attachedButton = model.get('attachedButton');

    if (attachedButton) {
      attachedButton.set('active', false);
      return;
    }

    model.set('active', false);
  },

  updateActive() {
    const { activeCls, model } = this;
    const active = model.get('active');
    this.$el[active ? 'addClass' : 'removeClass'](activeCls);
  },

  render() {
    const { model, el, $el } = this;
    const label = model.get('label');
    !model.get('el') && $el.empty();

    el.innerHTML = this.template({
      pfx: this.pfx,
      label,
    });

    $el.find('[data-role="main"]').append(model.get('content'));
    $el.addClass(`${this.className} ${this.ppfx}one-bg ${this.ppfx}two-color`);

    this.updateActive();

    return this;
  },
});
