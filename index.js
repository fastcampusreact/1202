const listeners = document.querySelectorAll('[data-model]');

listeners.forEach(listener => {
  const name = listener.dataset.model;
  listener.addEventListener('keyup', event => {
    state[name] = listener.value;
    console.log(state);
  });
});

const render = () => {

};

const createState = _state => {
  return new Proxy(_state, {
    set (target, property, value) {
      target[property] = value;
      render()
      return value
    }
  });
};

const state = createState({
  name: 'Jaehyeon',
  email: 'be9.smile@gmail.com'
});
