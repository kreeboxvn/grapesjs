import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    folderId: '',
    projectId: '',
    name: '',
    pageConfig: {},
    slug: '',
    title: ''
  }
});
