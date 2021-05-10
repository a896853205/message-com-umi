import { IBestAFSRoute } from '@umijs/plugin-layout';

export const routes: IBestAFSRoute[] = [
  {
    path: '/',
    exact: true,
    component: '@/pages/index',
    // 不展示顶栏
    headerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
  },
  {
    exact: true,
    path: '/oauth/:accessToken',
    component: '@/pages/oauth',
    // 不展示顶栏
    headerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
  },
  {
    path: '/home',
    component: '@/pages/home',
    flatMenu: true,
    routes: [
      {
        path: '/home/message-list',
        component: '@/pages/home/message-list',
        name: 'message-list',
        exact: true,
      },
      {
        path: '/home/message-create',
        component: '@/pages/home/message-create',
        name: 'message-create',
        exact: true,
      },
    ],
  },
];
