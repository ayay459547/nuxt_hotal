<template>
  <div class="detail-container">
    <b-row class="detail-row-img">
      <b-col md="12" xl="6" class="detail-col-img left">
        <div class="img-container">
          <img :src="roomData.imgList[0]" alt="roomImg1" class="img-1" />
        </div>
      </b-col>
      <b-col md="12" xl="6" class="detail-col-img right">
        <div class="img-container">
          <img :src="roomData.imgList[1]" alt="roomImg2" class="img-2" />
        </div>
        <div class="img-container">
          <img :src="roomData.imgList[2]" alt="roomImg3" class="img-3" />
        </div>
      </b-col>
    </b-row>
    <b-row class="detail-content">
      <b-col xl="12">
        <h4 class="content-title">{{ roomData.name }}</h4>
      </b-col>
      <b-col xl="12">
        <span class="content-des">{{ roomData.description }}</span>
      </b-col>

      <b-col xl="12">
        <span class="content-price">{{`平日: ${roomData.price.weekday.toLocaleString()}`}}</span>
        <span>{{ ` , ` }}</span>
        <span class="content-price">{{`假日: ${roomData.price.weekend.toLocaleString()}`}}</span>
      </b-col>

      <b-col xl="6" lg="12" class="content-info">
        <h5 class="info-title">房間資訊</h5>
        <ul class="info-list">
          <li v-for="(infoData, infoIndex) in roomInfo" :key="infoIndex" class="info-item">
            <span class="info-item-label">{{ infoData.label }}</span>
            <span class="info-item-data">{{  infoData.data }}</span>
          </li>
        </ul>
      </b-col>
      <b-col xl="6" lg="12" class="content-check">
        <h5 class="check-title">入住/退房時間</h5>
        <ul class="check-list">
          <li v-for="(checkData, checkIndex) in checkInfo" :key="checkIndex" class="check-item">
            <span class="check-item-label">{{ checkData.label }}</span>
            <span class="check-item-data">{{ checkData.data }}</span>
          </li>
        </ul>
      </b-col>

      <b-col xl="12" class="content-amenities">
        <h5 class="amenities-title">客房設施</h5>
        <ul class="amenities-list">
          <li class="amenities-item" v-for="(amenitiesList, amenitiesIndex) in amenitiesInfo" :key="amenitiesIndex">
            <div 
              v-for="(amenitiesItem, amenitiesIndex) in amenitiesList" 
              :key="amenitiesIndex"
              class="amenities-item-block"
              :class="{ 'is-true': amenitiesItem.data}"
            >
              <font-awesome-icon :icon="amenitiesItem.icon" class="block-icon"/>
              <span class="block-label">{{ amenitiesItem.label }}</span>
            </div>
          </li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'RoomDetail',
  props: {
    roomData: {
      type: Object,
      default() {
        return {
          id: 0,
          favorite: 0,
          name: 'Room',
          type: 0,
          price: {
            weekday: 0,
            weekend: 0,
          },
          imgList: [
            '/room/room1-1.png',
            '/room/room1-2.png',
            '/room/room1-3.png',
          ],
          descriptionShort: {
            GuestMin: 0,
            GuestMax: 0,
            Bed: ['Single'],
            'Private-Bath': 1,
            Footage: 0,
          },
          description:
            'Room description',
          checkInAndOut: {
            checkInEarly: '00:00',
            checkInLate: '00:00',
            checkOut: '00:00',
          },
          amenities: {
            WiFi: false,
            Breakfast: false,
            MiniBar: false,
            RoomService: false,
            Television: false,
            AirConditioner: false,
            Refrigerator: false,
            Sofa: false,
            GreatView: false,
            SmokeFree: false,
            ChildFriendly: false,
            PetFriendly: false,
          },
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    roomInfo() {
      const roomInfoData = this.roomData.descriptionShort
      return [
        {
          label: '人數限制',
          data: this.getGuestLimit(roomInfoData.GuestMin, roomInfoData.GuestMax),
        },
        {
          label: '床型',
          data: this.getBedData(roomInfoData.Bed),
        },
        {
          label: '衛浴數量',
          data: roomInfoData.PrivateBath,
        },
        {
          label: '房間大小',
          data: `${roomInfoData.Footage}坪`,
        },
      ]
    },
    checkInfo () {
      const roomCheckData = this.roomData.checkInAndOut
      return [
        {
          label: '入住時間',
          data: `${roomCheckData.checkInEarly} ~ ${roomCheckData.checkInLate}`
        },
        {
          label: '退房時間',
          data: `${roomCheckData.checkOut}`
        }
      ]
    },
    amenitiesInfo() {
      const amenitiesData = this.roomData.amenities
      return [
        [
          { label: 'Wi-Fi', data: amenitiesData.WiFi, icon: ['fas', 'wifi'] },
          { label: '早餐', data: amenitiesData.Breakfast, icon: ['fas', 'utensils'] },
          { label: '吧檯', data: amenitiesData.MiniBar, icon: ['fas', 'wine-bottle'] },
          { label: '客房服務', data: amenitiesData.RoomService, icon: ['fas', 'bell-concierge'] },
        ],
        [
          { label: '電視', data: amenitiesData.Television, icon: ['fas', 'tv'] },
          { label: '空調', data: amenitiesData.AirConditioner, icon: ['fas', 'snowflake'] },
          { label: '冰箱', data: amenitiesData.Refrigerator, icon: ['fas', 'box'] },
          { label: '沙發', data: amenitiesData.Sofa, icon: ['fas', 'couch'] },
        ],
        [
          { label: '風景', data: amenitiesData.GreatView, icon: ['fas', 'mountain'] },
          { label: '禁止抽菸', data: !amenitiesData.SmokeFree, icon: ['fas', 'ban-smoking'] },
          { label: '適合孩童', data: amenitiesData.ChildFriendly, icon: ['fas', 'children'] },
          { label: '寵物攜帶', data: amenitiesData.PetFriendly, icon: ['fas', 'paw'] },

        ]
      ]
    }
  },
  methods: {
    getGuestLimit(min, max) {
      if (min === max) {
        return `${min}`
      } else {
        return `${min} ~ ${max}`
      }
    },
    getBedData(bedList) {
      let count = {
        single: 0,
        double: 0,
      }
      bedList.forEach((item) => {
        if (item === 'Single') {
          count.single++
        } else if (item === 'Double') {
          count.double++
        }
      })

      let res = ''
      if (count.single > 0) {
        res += `單人床(${count.single})`
      }
      if (count.double > 0) {
        res += `雙人床(${count.double})`
      }
      return res
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  &-container {
    width: 100%;
    height: fit-content;
    overflow-x: hidden;
  }
  // 圖片
  &-row-img {
    width: 100%;
    margin-bottom: 16px;
  }
  &-col-img {
    width: 100%;
    height: 400px;
    padding: 8px;

    .img-container {
      width: 100%;
      overflow: hidden;
      margin: 8px 0;
    }
    &.left {
      .img-container {
        height: 100%;
      }
    }
    &.right {
      .img-container {
        height: 50%;
      }
    }

    [class^="img-"] {
      width: 80%;
      display: block;
      margin: 4px auto;
      object-fit: cover;
    }
  }
  // 內容
  &-content {
    width: 100%;
    padding: 32px 64px;
    height: fit-content;

    .content {
      &-title {
        color: #2d3643;
      }
      &-des {
        color: #748290;
        display: block;
        padding-bottom: 16px;
      }
      &-price {
        font-size: 1.5em;
        font-weight: 600;
        color: #2d3643;
      }
      &-info,
      &-check,
      &-amenities {
        margin-top: 16px;

        h5[class$="-title"] {
          font-size: 1.5em;
          font-weight: 600;
          color: #2D3643;
        }
      }
    }

    .info,
    .check {
      &-list {
        list-style: none;
        padding: 0;
      }
      &-item {
        &-label {
          width: 80px;
          display: inline-block;
        }
        &-data {
          color: #748290;
        }
      }
    }

    .amenities {
      &-list {
        list-style: none;
        padding: 0;
      }
      &-item {
        display: flex;
        padding: 4px 0;

        &-block {
          flex: 1;
          text-align: center;
          &.is-true {
            color: #2d3643;
          }
          &:not(.is-true) {
            color: #d3d3d3;
          }

          .block-icon {
            width: 30px;
          }
          .block-label {
            width: 80px;
            word-wrap: nowrap;
            display: inline-block;
            text-align: left;

            @media screen and (max-width: 992px) {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>