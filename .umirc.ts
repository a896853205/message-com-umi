import { defineConfig } from 'umi';

import { routes } from './config/route';

export default defineConfig({
  publicPath: '/',
  layout: {
    layout: 'top',
    logo: null,
    title: 'Message-client',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  sass: {},
  request: {
    dataField: '',
  },
  dynamicImport: {},
});
