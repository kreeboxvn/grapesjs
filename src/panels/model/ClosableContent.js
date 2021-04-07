import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    content: null,
    label: '',
    className: '',
    attributes: {},
    options: {},
    active: false,
    attachedButton: null,
  },

  initialize(options) {},
});
