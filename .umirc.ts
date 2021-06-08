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
  dynamicImport: {
    loading: '@/components/page-loading',
  },
  locale: {
    default: 'zh-CN',
  },
  mock: {
    exclude: [],
  },
  define: {
    'process.env.CLIENT_ID': process.env.CLIENT_ID,
    'process.env.REDIRECT_URI': process.env.REDIRECT_URI,
  },
});
