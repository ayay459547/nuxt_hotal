<template>
  <div class="home-wrapper">
    <img 
      class="home-img" 
      src="~/static/home-header.png" 
      alt="header"
      :style="{ top: `${scrollTop * -0.5}px` }"
    >
    <div class="home-container" @scroll="throttleSetScrollTop($event)">
      <div class="home-header">
        <i class="header-title">HexHotal</i>
        <nav class="header-nav">
          <nuxt-link to="/reservation" class="header-nav-link">
            <b-icon icon="calendar2" font-scale="1"></b-icon>
            <span>Reservation</span>
          </nuxt-link>
          <nuxt-link to="/list" class="header-nav-link">
            <b-icon icon="card-list" font-scale="1.2"></b-icon>
            <span>Room</span>
          </nuxt-link>
        </nav>
      </div>
      <div class="home-recommend">
        <div class="recommend-title">Recommend</div>
        <div class="recommend-popular">You may be interested in out popular rooms</div>
        <b-container class="bv-example-row">
          <b-row>
            <b-col v-for="room in popularList" :key="room.id" sm="12" md="6" lg="4">
              <b-card :title="room.name" :img-src="room.imgList[0]" img-alt="Image" img-top :img-height="180">
                <b-card-text>
                  This card has supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="home-footer">
        <!-- <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.515376436477!2d121.56057111744386!3d25.03303040000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6625e6f89%3A0xf3ab83833fbea1dd!2z5Y-w5YyXMTAxL-S4luiyvw!5e0!3m2!1szh-TW!2stw!4v1666961819944!5m2!1szh-TW!2stw" 
          width="90%"
          height="200" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe> -->
      </div>
    </div>
  </div>
  <!-- <Tutorial /> -->
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
import { roomList } from '~/fakeData/room' 
export default {
  name: 'IndexPage',
  data () {
    return {
      test: 123,
      scrollTop: 0,
      throttleSetScrollTop: throttle(this.setScrollTop)
    }
  },
  computed: {
    popularList () {
      return roomList.map(item => item).sort((a, b) => {
        return b.count - a.count
      }).slice(0, 3)
    }
  },
  methods: {
    setScrollTop(e) {
      this.scrollTop = e.srcElement?.scrollTop ?? 0
    }
  }
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
  
  &-recommend {
    width: 100%;
    height: fit-content;
    padding: 16px 32px;
    background-color: #ffffff;

    .recommend {
      &-title,
      &-popular {
        color: #748290;
      }
      &-title {
        font-size: 2em;
        font-weight: 600; 
      }
    }
  }
}
</style>
