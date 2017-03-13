# React-PWA

This component library helps you architect your PWA.

Things that are exported:

```js
import {
  ReactPWA,
  Link,
} from 'react-pwa';

render(
  <ReactPWA
    AppShell={Component}
    loading={LoadingComponent}
    config={config}
  />
);
```

*TODO*

- support popstate from browser buttons
- Add docs
- Break from create-react-app
- publish valid version
- work through churn of ensuring this library is correct
- move ownership to Hudl
- add prettier so PRs are don't argue over formatting
- better handle errors

*Future Ideas*
- inspect js/css response to ensure content was cached via a SW.
