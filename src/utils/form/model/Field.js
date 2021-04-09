import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    type: '',
    name: '',
    value: '',
    label: '',
    slugDest: '',
    options: []
  }
});
