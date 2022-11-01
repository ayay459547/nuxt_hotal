<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h3 class="login-title">LOGIN</h3>
      <b-form @submit="login">
        <CForm
          input-key="account"
          :label="account.label"
          v-model="account.value"
          :type="account.type"
          :required="account.required"
        />
        <CForm
          input-key="password"
          :label="password.label"
          v-model="password.value"
          :type="password.type"
          :required="account.required"
        />
        <b-button 
          type="submit" 
          variant="primary" 
          style="margin-top: 12px; font-size: 1.2em"
        >
          login
        </b-button>
      </b-form>
      <!-- <div>login</div>
      <input type="text" v-model="account">
      <input type="password" v-model="password">
      <button @click="login">login</button> -->
    </div>
  </div>
</template>

<script>
import token from '~/fakeData/token'
import { mapState, mapMutations } from 'vuex'
export default {
  head() {
    return {
      title: 'login',
      meta: [{ hid: '登入頁', name: 'login', content: '' }],
    }
  },
  data() {
    return {
      account: {
        value: '',
        label: '帳號',
        type: 'text',
        required: true,
      },
      password: {
        value: '',
        label: '密碼',
        type: 'password',
        required: true,
      },
    }
  },
  computed: mapState({
    token: (state) => state.token,
  }),
  methods: {
    ...mapMutations(['setToken']),
    login() {
      this.setToken(token)

      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  &-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    position: relative;
    background-image: url('~static/login.jpg');
    background-size: cover;

    &::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0px;
      left: 0px;

      border-color: #ffffff00 #ffffff00 #569dc3d1 #569dc3d1;
      border-style: solid solid solid solid;
      border-width: 600px;
      transition-duration: 0.3s;

      @media screen and (max-width: 1140px) {
        border-width: 500px;
      }
      @media screen and (max-width: 768px) {
        border-width: 400px;
      }
      @media screen and (max-width: 576px) {
        border-width: 0px;
      }
    }
  }
  &-container {
    width: 50%;
    padding: 32px;
    border-radius: 6px;
    box-shadow: 1px 1px 6px 2px #00000029;
    z-index: 999;
    background: #ffffff;
  }
  &-title {
    text-align: center;
  }
}
</style>