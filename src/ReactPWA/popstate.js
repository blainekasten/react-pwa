// @flow
import State from './state';
import { loadAssets } from './loader';
import './types';

let bound:bool = false;
function createPopStateListener() : void {
  if (bound || typeof window === 'undefined') return;
  bound = true;

  window.onpopstate = (e:Event): void => {
    let pathname:string = window.location.pathname;
    const { moduleUrl, styleUrl } = State.getState().appConfig[pathname];
    loadAssets(moduleUrl, styleUrl);
  }
}

export default {
  createPopStateListener,
};
