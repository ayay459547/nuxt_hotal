<template>
  <div>
    <h3>list</h3>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'list',
      meta: [
        { hid: '列表頁', name: 'list', content: '' }
      ]
    }
  },
  name: 'list',
  middleware: 'authList'
}
</script>

<style>

</style>