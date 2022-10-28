<template>
  <div>
    <div>login</div>
    <input type="text" v-model="account">
    <input type="password" v-model="password">
    <button @click="login">login</button>
  </div>
</template>

<script>
import token from '~/fakeData/token'
import { mapState, mapMutations } from 'vuex'
export default {
  head () {
    return {
      title: 'login',
      meta: [
        { hid: '登入頁', name: 'login', content: '' }
      ]
    }
  },
  data() {
    return {
      account: '',
      password: ''
    }
  },
  computed: mapState({
    token: state => state.token
  }),
  methods: {
    ...mapMutations(['setToken']),
    login() {
      if (this.account !== '' && this.password !== '') {
        this.setToken(token)

        this.$router.push({ name: 'index' })
      }
    }
  }
}
</script>

<style>

</style>