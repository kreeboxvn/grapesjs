import Backbone from 'backbone';
import Buttons from './Buttons';
import ClosableContents from './ClosableContents';

export default Backbone.Model.extend({
  defaults: {
    id: '',
    content: '',
    visible: true,
    buttons: [],
    attributes: {},
    closableContents: [],
  },

  initialize(options) {
    this.btn = this.get('buttons') || [];
    this.buttons = new Buttons(this.btn);
    this.set('buttons', this.buttons);
    this.set(
      'closableContents',
      new ClosableContents(this.get('closableContents')),
    );
  },

  updateClosableContentActive(id, isActive) {
    const clsContent = this.getClosableContent(id);
    if (clsContent) {
      clsContent.set('active', isActive);
    }
  },

  getClosableContent(id) {
    const clsContent = this.get('closableContents').where({ id });
    return clsContent.length ? clsContent[0] : null;
  },
});
