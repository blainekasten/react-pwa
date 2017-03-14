import State from './state';
import { loadAssets } from './loader';

let bound = false;
function createPopStateListener() {
  if (bound || typeof window === 'undefined') return;
  bound = true;

  window.onpopstate = (e) => {
    const { moduleUrl, styleUrl } = State.getState().appConfig[location.pathname];
    loadAssets(moduleUrl, styleUrl);
  }
}

export default {
  createPopStateListener,
};
