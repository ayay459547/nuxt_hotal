export default async function ({ store, route, redirect }) {
  await store.commit('initToken')

  const token = store.state.token || ''
  // if(route.name !== 'login' && token.length === 0) {
  //   redirect({ name: 'login' })
  // }
  // if(route.name === 'login' && token.length > 0) {
  //   redirect({ name: 'index' })
  // }
  console.log('middleware auth')
}