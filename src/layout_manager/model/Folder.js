import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    _id: '',
    name: '',
    projectId: '',
    slug: '',
    lft: 0,
    right: 0,
    position: 0,
    level: 0,
    parentId: null
  },
  initialize(opts) {
    this.set('id', this.get('_id'));
    this.on('change:parentId', this.changeParent);
  },
  changeParent() {
    this.collection && this.collection.trigger('tree:updated');
  }
});
