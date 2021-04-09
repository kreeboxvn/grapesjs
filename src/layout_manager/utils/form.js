import Form from '../../utils/form/model/Form';
import FormView from '../../utils/form/view/FormView';
import SubmitView from '../../utils/form/view/SubmitView';
import { folderFormId, pageFormId } from '../const';
import Folder from '../model/Folder';
import Page from '../model/Page';

let folder,
  folderForm,
  page,
  pageForm,
  attachedEditor,
  attachedPanel,
  attachedConfig;

const init = (editor, panel, config) => {
  if (!attachedEditor && !attachedPanel && !attachedConfig) {
    attachedPanel = panel;
    attachedEditor = editor;
    attachedConfig = config;
  }
};

const createFolderForm = () => {
  if (!folderForm) {
    folder = new Folder();

    const form = new Form({
      id: 'folder-form',
      useSubmit: false,
      fields: [
        {
          type: 'select',
          name: 'parentId',
          id: 'folder-parent',
          label: 'Parent Folder',
          options: attachedConfig.folders
        },
        {
          type: 'slug-origin',
          name: 'name',
          id: 'folder-name',
          label: 'Folder Name',
          slugDest: 'folder-slug'
        },
        {
          type: 'text',
          name: 'slug',
          id: 'folder-slug',
          label: 'Slug'
        }
      ]
    });

    folderForm = new FormView({
      model: form,
      entity: folder,
      config: attachedConfig,
      onSubmit: () => {
        attachedEditor && attachedEditor.trigger('folder:submit', folder, form);
      }
    });

    const submitButton = new SubmitView({
      form: form,
      config: attachedConfig
    });

    attachedPanel.get('closableContents').add({
      id: folderFormId,
      content: folderForm.render().el,
      className: 'folder-form sub-content',
      topContents: [submitButton.render().el]
    });

    attachedEditor.on(`stop:open-layouts`, () => {
      attachedPanel.updateClosableContentActive(folderFormId, false);
    });
  }
  return folderForm;
};

const updateFolderForm = newFolder => {
  if (!folderForm) {
    createFolderForm();
  }

  folder.set(newFolder.toJSON());
  folder.trigger('switchEntity', folder);

  const folderFormWrapper = attachedPanel
    .get('closableContents')
    .get(folderFormId);
  const folderLabel = folder.get('name') ? folder.get('name') : 'New Folder';
  folderFormWrapper &&
    folderFormWrapper.set('label', `${folderLabel} Settings`);

  attachedPanel.updateClosableContentActive(folderFormId, true);
  attachedPanel.updateClosableContentActive(pageFormId, false);
};

const createPageForm = () => {
  if (!pageForm) {
    page = new Page();

    const form = new Form({
      id: 'page-form',
      useSubmit: false,
      fields: [
        {
          type: 'select',
          name: 'folderId',
          id: 'page-folder',
          label: 'Folder',
          options: attachedConfig.folders
        },
        {
          type: 'slug-origin',
          name: 'name',
          id: 'page-name',
          label: 'Page Name',
          slugDest: 'page-slug'
        },
        {
          type: 'text',
          name: 'slug',
          id: 'page-slug',
          label: 'Slug'
        }
      ]
    });

    pageForm = new FormView({
      model: form,
      entity: page,
      config: attachedConfig,
      onSubmit: () => {
        attachedEditor && attachedEditor.trigger('page:submit', page, form);
      }
    });

    const submitButton = new SubmitView({
      form: form,
      config: attachedConfig
    });

    attachedPanel.get('closableContents').add({
      id: pageFormId,
      content: pageForm.render().el,
      className: 'page-form sub-content',
      topContents: [submitButton.render().el]
    });

    attachedEditor.on(`stop:open-layouts`, () => {
      attachedPanel.updateClosableContentActive(pageFormId, false);
    });
  }
  return pageForm;
};

const updatePageForm = newPage => {
  if (!pageForm) {
    createPageForm();
  }

  page.set(newPage.toJSON());
  page.trigger('switchEntity', page);

  const pageFormWrapper = attachedPanel.get('closableContents').get(pageFormId);
  const pageLabel = page.get('name') ? page.get('name') : 'New Page';
  pageFormWrapper && pageFormWrapper.set('label', `${pageLabel} Settings`);

  attachedPanel.updateClosableContentActive(pageFormId, true);
  attachedPanel.updateClosableContentActive(folderFormId, false);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { init, updateFolderForm, updatePageForm };
