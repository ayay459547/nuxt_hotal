<template>
  <div class="reservation-container">
    <ul v-if="reservationList.length > 0" class="reservation-list">
      <li v-for="(item, itemIndex) in reservationList" :key="itemIndex" class="reservation-item">
        <div class="item-left">
          <h5 class="item-title">{{ item.roomData.name }}</h5>
        </div>
        <div class="item-right">
          <span class="item-date">{{ `${item.checkDate.checkIn} ~ ${item.checkDate.checkOut}` }}</span>
          <span class="item-price">{{ item.total.toLocaleString() + ' NTD' }}</span>
          <b-button class="item-del" variant="danger" @click="cancel(itemIndex)">
            <font-awesome-icon icon="fa-solid fa-trash" />
            <span>Delete</span>
          </b-button>
        </div>
      </li>
    </ul>
    <div v-else class="reservation-empty">無預約</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      reservationList: state => state.reservationList,
    })
  },
  methods: {
    ...mapMutations(['removeReservation']),
    cancel(index) {
      this.$swal.fire({
        type: 'warning',
        title: '確認取消',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: `返回`,
      }).then((result) => {
        if (result.value) {
          this.removeReservation(index)
          this.$swal.fire('成功取消', '預約已取消', 'success')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reservation {
  &-container {
    width: 100%;
    background-color: #ffffff;
    height: fit-content;
    min-height: 100px;
    height: fit-content;
  }
  &-list {
    list-style: none;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &-item {
    min-height: 100px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    border-radius: 6px;
    padding: 16px;
    border: 1px solid skyblue;
    transition-duration: 0.2s;
    &:hover {
      box-shadow: 1px 1px 6px 2px #569DC3;
    }

    .item {
      &-left,
      &-right {
        display: flex;
      }
      &-title {
        width: 350px;
        display: block;
        padding: 0 16px;
        font-size: 1.8em;
      }

      &-date {
        font-weight: 600;
        font-size: 1.5em;
        color: #748290;
        transition-duration: 0.2s;

        @media screen and (max-width: 768px) {
          font-size: 1.2em;
        }
      }
      &-price {
        display: inline-block;
        min-width: 150px;
        width: fit-content;
        text-align: right;
        font-weight: 600;
        font-size: 1.5em;
        color: #569DC3;
        padding: 0 4px;
        transition-duration: 0.2s;

        @media screen and (max-width: 768px) {
          font-size: 1.2em;
        }
      }
      &-del {
        height: fit-content;
        margin: 0 4px;
      }
    }
  }

  &-empty {
    font-weight: 600;
    font-size: 2em;
    text-align: center;
    line-height: 200px;
  }
}
</style>