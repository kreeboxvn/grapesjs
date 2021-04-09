import { template } from 'underscore';
import Backbone from 'backbone';
import FolderView from './FolderView';
import PageView from './PageView';
import Folder from '../model/Folder';
import Page from '../model/Page';
import formUtils from '../utils/form';

export default Backbone.View.extend({
  id: 'layout-manager',

  events: {
    'click [data-role="create-new-folder"]': 'openNewFolderForm',
    'click [data-role="create-new-page"]': 'openNewPageForm'
  },

  template: template(`
    <ul id="layout-root"></ul>
    <div class="<%= pfx %>footer">
      <div class="<%= pfx %>footer-buttons">        
        <span title="Create New Page" data-role="create-new-page">
          <span>Create New Page</span>
          <span class="material-icons">
            add_box
          </span>
        </span>
        <span title="Create New Folder" data-role="create-new-folder">
          <span class="material-icons">
            create_new_folder
          </span>
        </span>
      </div>
    </div>
  `),

  initialize(opts) {
    this.opt = opts || {};
    this.config = this.opt.config || {};
    this.pfx = this.config.stylePrefix || '';

    this.pages = opts.pages;
    this.folders = opts.folders;

    this.listenTo(this.folders, 'add', this.addFolder);
    this.listenTo(this.pages, 'add', this.addPage);
    this.listenTo(this.folders, 'tree:updated', this.render);
    this.listenTo(this.pages, 'tree:updated', this.render);
  },

  addFolder(folder) {
    let dest;
    const folderView = new FolderView({
      model: folder,
      id: 'folder-' + folder.id,
      config: this.config
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
    const pageView = new PageView({ model: page, config: this.config });
    if (page.get('folderId')) {
      dest = this.$el
        .find('#folder-' + page.get('folderId'))
        .find('#folder-children-' + page.get('folderId'));
    } else {
      dest = this.$el.find('#layout-root');
    }

    dest.append(pageView.render().el);
  },

  initForms() {
    const panelId = 'left-views';
    const editor = this._getEditor();
    const pn = editor.Panels;

    if (editor) {
      const panel = pn.getPanel(panelId) || pn.addPanel({ id: panelId });
      formUtils.init(editor, panel, this.config);
    }
  },

  openNewFolderForm() {
    formUtils.updateFolderForm(new Folder());
  },

  openNewPageForm() {
    formUtils.updatePageForm(new Page());
  },

  _getEditor() {
    const em = this.config.em;
    return em ? em.get('Editor') : '';
  },

  /**
   * Print preorder tree traversal model
   * Conditions:
   * - data is already ordered by left
   */
  render() {
    this.$el.html(
      this.template({
        pfx: this.pfx
      })
    );

    this.$el.addClass(`${this.pfx}layout-manager`);

    this.folders.each(folder => this.addFolder(folder));
    this.pages.each(page => this.addPage(page));
    this.initForms();

    return this;
  }
});
