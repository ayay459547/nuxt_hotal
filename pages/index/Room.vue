<template>
  <div class="room-container">
    <b-row v-for="row in roomTypeList" :key="row.type" class="room-row">
      <b-col md="4" sm="12" class="room-col title">
        <h3>{{ row.label }}</h3>
        <span>{{ row.description }}</span>
      </b-col>

      <b-col
        v-for="col in row.roomList"
        :key="col.id"
        md="4"
        sm="6"
        class="room-col"
        @click="openDetail(col)"
      >
        <img :src="col.imgList[0]" :alt="col.name" class="col-img" />
        <h4 class="col-name">{{ col.name }}</h4>
        <span class="col-price">{{
          `$ ${col.price.weekday.toLocaleString()} NTD+`
        }}</span>
      </b-col>
    </b-row>

    <b-modal 
      v-model="modalShow" 
      size="xl"
      centered 
      scrollable 
      :title="currentRoomData.name"
    >
      <RoomDetail :roomData="currentRoomData"/>
      <template #modal-footer>
        <div>
          <b-button
            variant="primary"
            class="float-right"
            @click="modalShow=false"
          >
            Close
          </b-button>
          <b-button
            variant="info"
            class="float-right"
            style="margin: 0 8px"
            @click="modalShow=false"
          >
            Booking
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { roomList } from '~/fakeData/room'
export default {
  data() {
    return {
      test: 'Title',
      roomType: [
        {
          type: 1,
          label: 'One Person',
          description: 'Enjoy the one and only service',
        },
        {
          type: 2,
          label: 'Two People',
          description: 'The perfect choice for both of you',
        },
        {
          type: 3,
          label: 'Fanily',
          description: 'Wanna a big room?there you are',
        },
      ],
      currentRoomId: 0,
    }
  },
  computed: {
    roomTypeList() {
      return this.roomType.map((item) => {
        return {
          ...item,
          roomList: this.getRoom(item.type),
        }
      })
    },
    modalShow: {
      get () {
        return this.currentRoomId > 0
      },
      set (v) {
        if (!v) {
          this.currentRoomId = 0
        }
      }
    },
    currentRoomData() {
      return (
        roomList.filter((item) => {
          return item.id === this.currentRoomId
        })[0] ?? {
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
            'Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.',
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
      )
    },
  },
  methods: {
    getRoom(type) {
      return roomList.filter((room) => {
        return room.type === type
      })
    },
    openDetail(roomData) {
      this.currentRoomId = roomData.id
      console.log(roomData)
    },
    closeDetail() {
      this.currentRoomId = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.room {
  &-container {
    padding: 32px;
    width: 100%;
    height: fit-content;
    min-height: 300px;
    background-color: #ffffff;
  }
  &-row {
    height: fit-content;
  }
  &-col {
    height: 300px;
    padding: 8px;
    overflow: hidden;
    color: #748290;

    @media screen and (max-width: 768px) {
      &.title {
        height: 100px;
      }
    }
  }

  &-col {
    &.title h3 {
      font-size: 2.2em;
      font-weight: 600;
    }
    &:not(.title) {
      cursor: pointer;
      transition-duration: 0.2s;
      &:hover {
        box-shadow: 1px 1px 6px 2px #569dc3;
      }
      // border: 2px solid skyblue;
    }

    .col-img {
      width: 100%;
      height: 200px;
    }
    .col-name,
    .col-price {
      display: block;
      text-align: right;
    }
  }
}
</style>