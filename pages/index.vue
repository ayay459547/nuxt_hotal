<template>
  <div class="home-wrapper">
    <img 
      class="home-img" 
      src="~/static/home-header.png" 
      alt="header"
      :style="{ top: `${scrollTop * -0.8}px` }"
    >
    <div class="home-container" @scroll="throttleSetScrollTop($event)">
      <div class="home-header">
        <i class="header-title">HexHotal</i>
        <nav class="header-nav">
          <nuxt-link to="/" class="header-nav-link">
            <b-icon class="link-icon" icon="house-door" font-scale="1"></b-icon>
            <span class="link-text">Home</span>
          </nuxt-link>
          <nuxt-link to="/reservation" class="header-nav-link">
            <b-icon class="link-icon" icon="calendar2" font-scale="1"></b-icon>
            <span class="link-text">Reservation</span>
          </nuxt-link>
          <nuxt-link to="/room" class="header-nav-link">
            <b-icon class="link-icon" icon="card-list" font-scale="1.2"></b-icon>
            <span class="link-text">Room</span>
          </nuxt-link>
          <div class="header-nav-link" @click.prevent="logout">
            <b-icon class="link-icon" icon="box-arrow-right" font-scale="1.2"></b-icon>
            <span class="link-text">Log out</span>
          </div>
        </nav>
      </div>

      <nuxt-child/>
    </div>
  </div>
</template>

<script>
/**
 * 節流函數
 * @param {Function} callback 回調函數
 * @param {Number} delay 延遲
 * @param {Object} options 選用設定
 *                 noLeading: 是否不執行第一次回調函數
 *                 noTrailing: 是否不執行setTimeout的回調函數
 * @returns {Object} 包含回調函數的Proxy
 */
const throttle = (callback, delay, options = {}) => {
  let now = null
  let timeoutId = null
  let lastTime = null

  const defaultOptions = {
    noLeading: false,
    noTrailing: false,
    ...options
  }
  let { noLeading, noTrailing } = defaultOptions
  
  // 外部可使用
  const scopeData = {
    clearLastTime () {
      lastTime = null
    }
  }

  return new Proxy(() => {}, {
    set (obj, key, value) {
      if (scopeData.hasOwnProperty(key)) {
        scopeData[key] = value
        return true
      }
    },
    get (obj, key) {
      if (scopeData.hasOwnProperty(key)) {
        return scopeData[key]
      }
      return obj[key]
    },
    apply (obj, thisArg, params) {
      now = +new Date()

      // 如果不是第一次執行 && 現在時間 < 上次執行時先 + 延遲時間
      if (lastTime && now < lastTime + delay) {
        if (noTrailing) return

        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          lastTime = now
          callback.call(thisArg, ...params)
        }, delay)
      } else {
        if (noLeading) { 
          noLeading = false
        } else {
          lastTime = now
          callback.call(thisArg, ...params)
        }
      }
    }
  })
}
import { mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  data () {
    return {
      scrollTop: 0,
      throttleSetScrollTop: throttle(this.setScrollTop, 10)
    }
  },
  methods: {
    setScrollTop(e) {
      this.scrollTop = e.srcElement?.scrollTop ?? 0
    },
    ...mapMutations(['cleanToken']),
    logout() {
      this.cleanToken()

      this.$router.push({ name: 'login' })
    }
  },
  // validate({ params, query }) {
  //   console.log('validate')
  //   return true
  // },
  // asyncData({ store, params }) {
  //   console.log('asyncData')
  // },
  // fetch({ app, store, params }) {
  //   console.log('fetch')
  // }
}
</script>

<style lang="scss" scoped>
$radius: 6px;

.home {
  // 為了背景多包一層
  &-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  // 背景
  &-img {
    width: 100%;
    position: absolute;
    left: 0;
    transition: top;
    will-change: top;
  }

  // 內頁
  &-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  }

  &-header {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;

    display: flex;
    justify-content: space-between;
    .header {
      &-title {
        writing-mode: vertical-rl;
        font-size: 3em;
        font-weight: 600;
        transform:  translate(-5px, 10px);
        padding: 16px 32px;
      }
      &-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 64px;
        
        &-link {
          font-size: 1.8em;
          padding: 8px 32px;
          text-decoration: none;
          cursor: pointer;

          .link-icon {
            width: 50px;
          }

          @media screen and (max-width: 768px) {
            font-size: 1.5em;
            padding: 8px 16px;
          }

          border-left: 2px solid #2D3643;
          border-right: 2px solid #2D3643;
          border-top: 2px solid #2D3643;
          &:first-child {
            border-radius: $radius $radius 0 0;
          }
          &:last-child {
            border-bottom: 2px solid #2D3643;
            border-radius: 0 0 $radius $radius;
          }

          color: #748290;
          background-color: #ffffff;
          transition-duration: 0.2s;
          &:hover {
            color: #ffffff;
            background-color: #569DC3;
          }
        }
      }
    }
  }
}
</style>
