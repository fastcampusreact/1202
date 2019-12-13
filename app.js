const listeners = document.querySelectorAll('[data-model]');

listeners.forEach(listener => {
  const name = listener.dataset.model;
  listener.addEventListener('keyup', e => {
    state[name] = listener.value;
    // console.log(state);
  })
})

const render = () => {

};

// 프록시 - 특정 로직이나 데이터가 변경되는 것을 감지하여 컨텍스트를 변경할 수 있음
const createState = state => {
  return new Proxy(state, {
    set(target, property, value) {
      target[property] = value;
      render();
      return true;
    }
  })
};

// 양방향 바인딩
const state = createState({
  name: 'Jinhyun',
  email: 'smilejin92@gmail.com'
});
