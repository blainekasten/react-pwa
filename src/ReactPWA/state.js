//@flow
import type { InternalState } from './types';
let state:InternalState = {
  isLoading: false, // needs to default to false if we are not rendering a pwa site
  appConfig: {}, // config that describes the PWA
  error: false, // informs if we render the Error module
  moduleProps: {}, // object that gets passed to the rendered module
};

let subscriber = () => {};

export default {
  subscribe(fn:Function):void {
    subscriber = fn;
  },

  getState():InternalState {
    return state;
  },

  setState(_state:Object) {
    state = {
      ...state,
      ..._state,
    };
    subscriber();
  },
};
