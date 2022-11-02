export const state = () => {
  return {
    token: '',
    reservationList: [
      {
        roomData: {
          id: 1,
          favorite: 33,
          name: 'Single Room',
          type: 1,
          price: {
            weekday: 1380,
            weekend: 1500,
          },
          imgList: ['/room/room1-1.png', '/room/room1-2.png', '/room/room1-3.png'],
          descriptionShort: {
            GuestMin: 1,
            GuestMax: 1,
            Bed: ['Single'],
            PrivateBath: 1,
            Footage: 18,
          },
          description:
            'Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.',
          checkInAndOut: {
            checkInEarly: '15:00',
            checkInLate: '19:00',
            checkOut: '10:00',
          },
          amenities: {
            WiFi: true,
            Breakfast: true,
            MiniBar: false,
            RoomService: false,
            Television: true,
            AirConditioner: true,
            Refrigerator: true,
            Sofa: false,
            GreatView: false,
            SmokeFree: false,
            ChildFriendly: false,
            PetFriendly: true,
          },
        },
        checkDate: {
          checkIn: '2022-11-02',
          checkOut: '2022-11-03'
        },
        total: 3780
      }
    ]
  }  
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
  },
  addReservation(state, info) {
    state.reservationList.push(info)
  },
  removeReservation(state, index) {
    state.reservationList.splice(index, 1)
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const actions = {
  nuxtServerInit (store) {
    console.log('nuxtServerInit')
  },
  async checkReservation(store, info) {
    console.log(info)
    
    await timeout(3000)

    return true
  }
}