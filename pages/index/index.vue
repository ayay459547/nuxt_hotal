<template>
  <div style="display: content">
    <div class="home-recommend">
      <div class="recommend-title">Recommend</div>
      <div class="recommend-popular">
        You may be interested in out popular rooms
      </div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col
            v-for="room in popularList"
            :key="room.id"
            sm="12"
            md="6"
            lg="4"
            style="margin: 8px 0"
          >
            <b-card
              v-if="room.imgList.length > 0"
              :title="room.name"
              :img-src="room.imgList[0]"
              :img-alt="room.name"
              img-top
              :img-height="200"
            >
              <b-card-text>{{ room.description }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="home-reserve">
      <b class="reserve-title">Reserve The Best Service</b>
      <span class="reserve-text"
        >Over 50,000 Commendations From Our Guests</span
      >
    </div>
    <div class="home-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.515376436477!2d121.56057111744386!3d25.03303040000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6625e6f89%3A0xf3ab83833fbea1dd!2z5Y-w5YyXMTAxL-S4luiyvw!5e0!3m2!1szh-TW!2stw!4v1666961819944!5m2!1szh-TW!2stw"
        allowfullscreen=""
        width="100%"
        loading="lazy"
        class="google-map"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { roomList } from '~/fakeData/room'
export default {
  data () {
    return {
      popularList: []
    }
  },
  created () {
    this.popularList = roomList.map(item => item).sort((a, b) => {
      return b.favorite - a.favorite
    }).slice(0, 3)
  }
}
</script>

<style lang="scss" scoped>
$radius: 6px;

.home {
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
      &-popular {
        padding: 0 4px 8px;
      }
    }
  }

  &-reserve {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    transition-duration: 0.3s;
    justify-content: end;
    align-items: flex-end;
    height: 300px;

    @media screen and (max-width: 768px) {
      justify-content: center;
      align-items: center;
      height: 200px;
    }

    .reserve {
      &-title {
        font-size: 2em;
      }
      &-text {
        font-size: 1.2em;
      }
    }
  }

  &-map {
    padding: 64px;
    background-color: #ffffff;

    @media screen and (max-width: 768px) {
      padding: 32px;
    }

    .google-map {
      border-radius: 12px;
      border: 3px solid #ffffff;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      transition-duration: 0.3s;
      height: 400px !important;

      @media screen and (max-width: 768px) {
        height: 300px !important;
      }
    }
  }
}
</style>

