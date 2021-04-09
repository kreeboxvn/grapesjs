import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  events: {
    click: 'submit'
  },
  template: template(`
    <button class="submit <%= ppfx %>four-color">
        <span class="material-icons-round">
            save
        </span>
        <span>Save</span>
    </button>
  `),

  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.form = opts.form || null;

    this.ppfx = this.config.pStylePrefix || '';
    this.listenTo(this.form, 'change:status', this.onFormChangeStatus);
  },

  onFormChangeStatus() {
    const activeClasses = ['active', `${this.ppfx}four-color`].join(' ');
    const inactiveClasses = ['inactive', `${this.ppfx}two-color`].join(' ');
    switch (this.form.get('status')) {
      case 'submitting':
        this.$el
          .find('button')
          .removeClass(activeClasses)
          .addClass(inactiveClasses);
        break;

      default:
        this.$el
          .find('button')
          .removeClass(inactiveClasses)
          .addClass(activeClasses);
        break;
    }
  },

  submit() {
    this.form &&
      this.form.get('status') !== 'submitting' &&
      this.form.set('status', 'submitting');
  },

  render() {
    this.$el.html(this.template({ ppfx: this.ppfx }));

    return this;
  }
});
