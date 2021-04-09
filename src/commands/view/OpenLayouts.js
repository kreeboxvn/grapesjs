const panelId = 'left-views';
const layoutManagerId = 'layout-manager';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  run(editor, sender) {
    const pn = editor.Panels;
    const lm = editor.LayoutManager;
    const panels = pn.getPanel(panelId) || pn.addPanel({ id: panelId });

    if (!this.layout) {
      const layout = lm.render();
      panels.get('closableContents').add({
        id: layoutManagerId,
        content: layout,
        label: 'Pages',
        attachedButton: sender,
      });

      this.layout = layout;
    }

    panels.updateClosableContentActive(layoutManagerId, true);
  },

  stop(editor) {
    const pn = editor.Panels;
    const panels = pn.getPanel(panelId) || pn.addPanel({ id: panelId });

    panels.updateClosableContentActive(layoutManagerId, false);
  },
};
