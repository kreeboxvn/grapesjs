import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'li',
  template: template(`
      <%= name %>
      <ul id="folder-children-<%= id %>">
      </ul>
  `),
  render() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});
