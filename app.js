const listeners = document.querySelectorAll('[data-model]')

// for ... of  비동기로 돌려면 for ... of로

listeners.forEach(listener => {
  const name = listener.dataset.model
  listener.addEventListener('keyup', event => {
    state[name] = listener.value
  })
})

const render = () => {

}

const createState = state => {
  return new Proxy(state, {
    set (target, property, value) {
      target[property] = value
      render()
      return true
    }
  })
}

const state = createState({
  name: 'Kwansik',
  email: 'kwansk0424@gmail.com'
})

