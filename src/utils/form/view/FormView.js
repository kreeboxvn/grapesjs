import { template } from 'underscore';
import Backbone from 'backbone';
import TextInputView from './TextInputView';
import SelectView from './SelectView';
import SubmitView from './SubmitView';
import slugify from 'slugify';

export default Backbone.View.extend({
  events: {
    'submit form': 'submit',
    'keyup [data-type=slug-origin]': 'slugifyHandler'
  },

  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.model = opts.model;
    this.entity = opts.entity;
    this.onSubmit = opts.onSubmit;

    this.ppfx = this.config.pStylePrefix || '';
    this.fields = this.model.get('fields');

    this.listenTo(this.entity, 'switchEntity', this.render);
    this.listenTo(this.model, 'change:status', this.changeStatus);
  },

  changeStatus() {
    switch (this.model.get('status')) {
      case 'submitting':
        this.submit();
        break;

      default:
        break;
    }
  },
  submit(e) {
    e && e.preventDefault();
    this.fields.forEach(field => {
      this.entity.set(field.get('name'), field.get('value'));
    });
    console.log('submitting: ', this.entity);
    this.onSubmit();
  },

  slugifyHandler(e) {
    const id = e.target.id;
    const value = e.target.value;
    const field = this.fields.get(id);

    if (!field) {
      return;
    }

    const targetFieldId = field.get('slugDest');
    const targetField = this.fields.get(targetFieldId);

    if (!targetField) {
      return;
    }

    targetField.set(
      'value',
      slugify(value, {
        lower: true
      })
    );
  },

  _getEditor() {
    const em = this.config.em;
    return em ? em.get('Editor') : '';
  },

  template: template(`
    <form class="<%= ppfx %>form">
      <div data-role="form-fields"></div>
    </form>
  `),

  render() {
    const model = this.model;
    this.$el.html(
      this.template({
        ...model.toJSON(),
        ppfx: this.ppfx
      })
    );

    this.fields.forEach(field => {
      field.set('value', this.entity.get(field.get('name')));
      let FieldView;
      switch (field.get('type')) {
        case 'select':
          FieldView = SelectView;
          break;
        default:
          FieldView = TextInputView;
          break;
      }

      const view = new FieldView({ model: field, config: this.config });
      this.$el.find('[data-role="form-fields"]').append(view.render().el);
    });

    if (this.model.get('useSubmit')) {
      const submit = new SubmitView({
        form: this,
        config: this.config
      });

      this.$el.find('form').append(submit.render().el);
    }

    return this;
  }
});
