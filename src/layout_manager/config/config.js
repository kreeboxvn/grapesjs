export default {
  // Specify the element to use as a container, string (query) or HTMLElement
  // With the empty value, nothing will be rendered
  appendTo: '',
  folders: [
    {
      id: 'folderId1',
      name: 'Folder 1',
      slug: 'slug-string-1',
      projectId: '9999',
      lft: 1,
      right: 2,
      position: 1,
      level: 0,
      parentId: null
    },
    {
      id: 'folderId2',
      name: 'Folder 2',
      slug: 'slug-string-2',
      projectId: '9999',
      lft: 1,
      right: 2,
      position: 2,
      level: 1,
      parentId: 'folderId1'
    },
    {
      id: 'folderId3',
      name: 'Folder 3',
      slug: 'slug-string-3',
      projectId: '9999',
      lft: 1,
      right: 2,
      position: 3,
      level: 1,
      parentId: 'folderId1'
    },
    {
      id: 'folderId4',
      name: 'Folder 4',
      slug: 'slug-string-4',
      projectId: '9999',
      lft: 1,
      right: 2,
      position: 4,
      level: 2,
      parentId: 'folderId2'
    }
  ],
  pages: [
    {
      id: 'pageId1',
      folderId: 'folderId1',
      name: 'Page 1',
      pageConfig: {
        components: '[{}]',
        html: '<div>test</div>',
        css: 'css string',
        assets: 'assets string',
        styles: 'styles sttring'
      },
      projectId: 'projectId',
      slug: 'slug-string',
      title: 'title',
      revisionId: 'revisionId'
    },
    {
      id: 'pageId2',
      folderId: 'folderId2',
      name: 'Page 2',
      pageConfig: {
        components: '[{}]',
        html: '<div>test</div>',
        css: 'css string',
        assets: 'assets string',
        styles: 'styles sttring'
      },
      projectId: 'projectId',
      slug: 'slug-string',
      title: 'title',
      revisionId: 'revisionId'
    }
  ]
};
