// @flow

function checkOk(res) {
  if (res.ok === false) {
    throw new Error('Error loading css');
  }
  return res;
}

export default function fetchToText(url:string, acceptHeader:string):Promise<string> {
  return fetch(url, {
      headers: new Headers({
        Accept: acceptHeader,
      }),
    })
    .then(checkOk)
    .then(res => res.text());
}
