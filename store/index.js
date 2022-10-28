export const state = {
  token: ''
}

export const mutations = {
  initToken (state) {
    state.token = this.$cookies.get('token')
  },
  setToken (state, token) {
    state.token = token
    this.$cookies.set('token', token)
  },
  cleanToken (state) {
    state.token = ''
    this.$cookies.remove('token')
  }
}

export const actions = {
  nuxtServerInit (store, context) {
    console.log('nuxtServerInit')
  }
}