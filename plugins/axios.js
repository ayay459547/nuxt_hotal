export default ({ $axios }) => {
  $axios.onRequest((config) => {
    console.log('req config', config)
  })

  $axios.onRequest((error) => {
    console.log('req error', error)
  })

  $axios.onResponse((response) => {
    console.log('res config', response)

    return response
  })
}