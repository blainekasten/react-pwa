import State from './state';
// asset 1 is rendered

let styleNode;
let scriptNode;

// asset 2 is requested
// delay in loading
// transition to render asset 2
// asset 2 is rendered
export function loadAssets(moduleUrl:string, styleUrl:string) : void {
  State.setState({isLoading: true});
  removePreviousLoadingNodes();

  Promise.all([
    loadModule(moduleUrl),
    loadStyle(styleUrl),
  ]).then((assets) => {
    console.log(assets);
    setTimeout(() => {
      State.setState({isLoading: false});
    }, 600);
  }).catch(e => {
    console.log('error', e);
  });
}

function loadModule(moduleUrl:string):Promise {
  return new Promise((resolve, reject) => {
    scriptNode = document.createElement('script');
    scriptNode.src = moduleUrl;
    scriptNode.type = 'text/javascript';

    scriptNode.onload = resolve;
    scriptNode.onerror = reject;

    document.body.appendChild(scriptNode);
  });
}

function loadStyle(styleUrl:string):Promise {
  return new Promise((resolve, reject) => {
    styleNode = document.createElement('link');
    styleNode.href = styleUrl;
    styleNode.type = 'text/css';
    styleNode.rel = 'stylesheet';

    styleNode.onload = resolve;
    styleNode.onerror = reject;

    document.body.appendChild(styleNode);
  });
}

/*
  Clear away the previous nodes from the DOM.
*/
function removePreviousLoadingNodes() {
  if (styleNode) {
    styleNode.parentElement.removeChild(styleNode);
    styleNode = undefined;
  }
  if (scriptNode) {
    scriptNode.parentElement.removeChild(scriptNode);
    scriptNode = undefined;
  }
}
