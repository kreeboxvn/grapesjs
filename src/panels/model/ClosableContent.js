import Backbone from 'backbone';
import ClosableContents from './ClosableContents';

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
    topContents: []
  },

  initialize(options) {}
});
