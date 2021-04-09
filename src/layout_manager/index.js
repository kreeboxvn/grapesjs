import Folders from './model/Folders';
import Pages from './model/Pages';
import LayoutView from './view/LayoutView';
import defaults from './config/config';
import formUtils from './utils/form';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  let c = {},
    layoutView,
    pages,
    folders;
  return {
    /**
     * Name of the module
     * @type {String}
     * @private
     */
    name: 'LayoutManager',

    /**
     * Get configuration object
     * @return {Object}
     */
    getConfig() {
      return c;
    },

    init: config => {
      c = config || {};

      for (let name in defaults) {
        if (!(name in c)) {
          c[name] = defaults[name];
        }
      }

      const ppfx = c.pStylePrefix;
      if (ppfx) c.stylePrefix = ppfx + c.stylePrefix;

      // Global pages collection
      pages = new Pages(c.pages);
      // Global folders collection
      folders = new Folders(c.folders);

      c.folders = folders;

      layoutView = new LayoutView({ pages, folders, config: c });
    },

    getFolder(id) {
      var res = folders.where({ id });
      return res.length ? res[0] : null;
    },

    addFolder(folder) {
      return folders.add(folder);
    },

    getPage(id) {
      var res = pages.where({ id });
      return res.length ? res[0] : null;
    },

    updateFolderForm: formUtils.updateFolderForm,
    updatePageForm: formUtils.updatePageForm,

    addPage(page) {
      return pages.add(page);
    },

    /**
     * Load default pages and folders if the collection is empty
     */
    onLoad() {
      console.log('loading layout content');
    },

    render: () => {
      return layoutView.render().el;
    }
  };
};
