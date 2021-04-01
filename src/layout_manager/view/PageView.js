import { template } from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'a',
  template: template(`
    <span><%= name %></span>
  `),
  render() {
    this.$el.html(this.template(this.model.toJSON())).attr('href', '#');
    return this;
  }
});
