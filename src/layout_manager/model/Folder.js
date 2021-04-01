import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    name: '',
    projectId: '',
    slug: '',
    lft: 0,
    right: 0,
    position: 0,
    level: 0,
    parentId: 0
  }
});
