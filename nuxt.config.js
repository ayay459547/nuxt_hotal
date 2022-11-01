export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue_nuxt_project',
    htmlAttrs: {
      lang: 'zh-tw',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/css/scroll.css'
  ],
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/router.js',
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'bootstrap-vue/nuxt',
    '@nuxtjs/fontawesome',
    // 跨域
    // '@nuxtjs/proxy'
  ],
  loading: '~/components/Loading.vue',
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    // proxy: true,
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:3000',
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   }
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: 'auth'
  },
  bootstrapVue: {
    icons: true
  },
  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },
}
