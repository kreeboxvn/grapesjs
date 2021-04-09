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
    this.listenTo(this.model, 'change:label', this.updateLabel);
  },

  events: { 'click .close': 'close' },

  template: template(`
    <div class="<%= pfx %>header">
      <h3 data-role="label" class="<%= ppfx %>four-color"><%= label %></h3>
      <div class="<%= pfx %>header-right">
        <div data-role="header-additional-content">
        </div>
        <span class="material-icons close">close</span>
      </div>
    </div>
    <div class="<%= pfx %>main" data-role="main"></div>
    </div>
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

  updateLabel() {
    const { model } = this;
    const label = model.get('label');
    this.$el.find('[data-role="label"]').html(label);
  },

  render() {
    const { model, el, $el } = this;
    const label = model.get('label');
    !model.get('el') && $el.empty();

    el.innerHTML = this.template({
      pfx: this.pfx,
      ppfx: this.ppfx,
      label
    });

    $el.find('[data-role="main"]').append(model.get('content'));

    model.get('topContents').forEach(topContent => {
      $el.find('[data-role="header-additional-content"]').append(topContent);
    });

    $el.addClass(`${this.className} ${this.ppfx}one-bg ${this.ppfx}two-color`);

    this.updateActive();

    return this;
  }
});
