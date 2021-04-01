import { isElement } from 'underscore';

import Folders from './model/Folders';
import Pages from './model/Pages';
import LayoutView from './view/LayoutView';
import defaults from './config/config';

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
      console.log('init Layout Manager');

      c = config || {};

      for (let name in defaults) {
        if (!(name in c)) {
          c[name] = defaults[name];
        }
      }

      // Global pages collection
      pages = new Pages(c.pages);
      // Global folders collection
      folders = new Folders(c.folders);

      layoutView = new LayoutView({ pages, folders });
    },

    /**
     * Load default pages and folders if the collection is empty
     */
    onLoad() {
      console.log('loading layout content');
    },

    render: () => {
      return layoutView.render().el;
    },

    postRender() {
      console.log('Start Rendering Layout Manager');
      const elTo = this.getConfig().appendTo;

      if (elTo) {
        const el = isElement(elTo) ? elTo : document.querySelector(elTo);
        el.appendChild(this.render());
      }
    }
  };
};
