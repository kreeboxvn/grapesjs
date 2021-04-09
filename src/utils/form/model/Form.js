import Backbone from 'backbone';
import Fields from './Fields';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    method: 'POST',
    useSubmit: true,
    fields: [],
    status: 'pending'
  },
  initialize(options) {
    this.set('fields', new Fields(this.get('fields')));
  }
});
