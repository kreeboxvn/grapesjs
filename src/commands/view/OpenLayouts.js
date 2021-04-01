export default {
  run(editor, sender) {
    const lm = editor.LayoutManager;
    const pn = editor.Panels;

    console.log('showing layout manager: ', lm);

    if (!this.layouts) {
      const id = 'views-container';
      const layouts = document.createElement('div');
      const panels = pn.getPanel(id) || pn.addPanel({ id });
      layouts.appendChild(lm.render());
      panels.set('appendContent', layouts).trigger('change:appendContent');
      this.layouts = layouts;
    }

    this.layouts.style.display = 'block';
  },

  stop() {
    const layouts = this.layouts;
    layouts && (layouts.style.display = 'none');
  }
};
