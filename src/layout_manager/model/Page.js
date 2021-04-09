import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    _id: '',
    folderId: '',
    projectId: '',
    name: '',
    pageConfig: {},
    slug: '',
    title: '',
    focused: false
  },
  initialize(opts) {
    this.set('id', this.get('_id'));
    this.on('change:folderId', this.changeFolder);
  },
  changeFolder() {
    this.collection && this.collection.trigger('tree:updated');
  },
  focus() {
    this.collection &&
      this.collection.forEach(model => {
        model.set('focused', false);
      });
    this.set('focused', true);
  }
});
