import { template } from 'underscore';
import Backbone from 'backbone';
import FolderView from './FolderView';
import PageView from './PageView';

export default Backbone.View.extend({
  id: 'layout-manager',
  template: template(`
    <div class="gjs-lm-header">
      <span class="gjs-lm-header-title">Pages</span>
      <div class="gjs-lm-header-buttons">
        <button title="Create New Folder">
          <i class="fa fa-folder"></i>
        </button>
        <button title="Create New Page">
          <i class="fa fa-file"></i>
        </button>
      </div>
    </div>
    <ul id='layout-root'></ul>
  `),
  initialize(opts, config) {
    this.pages = opts.pages;
    this.folders = opts.folders;
    this.listenTo(this.folders, 'add', this.addFolder);
    this.listenTo(this.pages, 'add', this.addPage);
  },

  addFolder(folder) {
    let dest;
    const folderView = new FolderView({
      model: folder,
      id: 'folder-' + folder.id
    });
    if (folder.get('parentId')) {
      dest = this.$el
        .find('#folder-' + folder.get('parentId'))
        .find('#folder-children-' + folder.get('parentId'));
    } else {
      dest = this.$el.find('#layout-root');
    }

    dest.append(folderView.render().el);
  },

  addPage(page) {
    let dest;
    const pageView = new PageView({ model: page });
    if (page.get('folderId')) {
      dest = this.$el.find('#folder-' + page.get('folderId'));
    } else {
      dest = this.$el.find('#layout-root');
    }

    dest.append(pageView.render().el);
  },

  /**
   * Print preorder tree traversal model
   * Conditions:
   * - data is already ordered by left
   */
  render() {
    this.$el.html(this.template());

    this.folders.each(folder => this.addFolder(folder));
    this.pages.each(page => this.addPage(page));

    return this;
  }
});
