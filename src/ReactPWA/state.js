let state = {
  isLoading: true,
};

let subscriber = () => {};

export default {
  subscribe(fn) {
    subscriber = fn;
  },

  getState() {
    return state;
  },

  setState(_state) {
    state = {
      ...state,
      ..._state,
    };
    subscriber(state);
  },
};
