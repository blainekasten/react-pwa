// @flow

import State from './state';
import type { AppConfig, UrlConfig } from './types';
// asset 1 is rendered

let styleNode;
let scriptNode;

// asset 2 is requested
// delay in loading
// transition to render asset 2
// asset 2 is rendered
export function loadAssets(url:string) : void {
  removePreviousLoadingNodes();

  const appConfig:AppConfig = State.getState().appConfig;
  const urlConfig:UrlConfig = appConfig[url];

  // do not try to load assets if this url is not registered
  if (!urlConfig) return;

  // only show loading spinner if it takes more than 200ms to get response
  const loadingTimeout = setTimeout(() => {
    State.setState({isLoading: true});
  }, 200);


  Promise.all([
    loadPrefetch(urlConfig.dataPrefetchUrl),
    loadModule(urlConfig.moduleUrl),
    loadStyle(urlConfig.styleUrl),
  ]).then(([moduleProps:Object]):void => {
    clearTimeout(loadingTimeout);
    State.setState({
      isLoading: false,
      error: false,
      moduleProps,
    });
  }).catch((errorValue:Error):void => {
    clearTimeout(loadingTimeout);
    State.setState({isLoading: false, error: true, errorValue});
  });
}

function loadPrefetch(dataPrefetchUrl:?string):Promise<Object> {
  if (!dataPrefetchUrl || dataPrefetchUrl.length === 0) {
    return new Promise(resolve => resolve({}));
  }

  return fetch(dataPrefetchUrl).then(resp => resp.json());
}

function loadModule(moduleUrl:string):Promise<Event> {
  return new Promise((resolve, reject) => {
    scriptNode = document.createElement('script');
    scriptNode.src = moduleUrl;
    scriptNode.type = 'text/javascript';

    scriptNode.onload = resolve;
    scriptNode.onerror = reject;

    window.document.body.appendChild(scriptNode);
  });
}

function loadStyle(styleUrl:string):Promise<Event> {
  return new Promise((resolve, reject) => {
    styleNode = document.createElement('link');
    styleNode.href = styleUrl;
    styleNode.type = 'text/css';
    styleNode.rel = 'stylesheet';

    styleNode.onload = resolve;
    styleNode.onerror = reject;

    window.document.body.appendChild(styleNode);
  });
}

/*
  Clear away the previous nodes from the DOM.
*/
function removePreviousLoadingNodes() {
  if (styleNode) {
    styleNode.parentElement && styleNode.parentElement.removeChild(styleNode);
    styleNode = undefined;
  }

  if (scriptNode) {
    scriptNode.parentElement && scriptNode.parentElement.removeChild(scriptNode);
    scriptNode = undefined;
  }
}
