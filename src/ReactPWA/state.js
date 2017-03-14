let state = {
  isLoading: false, // needs to default to false if we are not rendering a pwa site
  appConfig: {}, // config that describes the PWA
  error: false, // informs if we render the Error module
  moduleProps: {}, // object that gets passed to the rendered module
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
    subscriber();
  },
};
