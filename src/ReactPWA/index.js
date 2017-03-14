// @flow
import React from 'react';
import Router from 'react-router-dom/BrowserRouter';
import RRLink from 'react-router-dom/Link';
import { loadAssets } from './loader';
import State from './state';
import Popstate from './popstate';
import type { ProgressiveWebAppProps } from './types';

export class ProgressiveWebApp extends React.Component {
  static propTypes = {
    AppShell: React.PropTypes.func,
    config: React.PropTypes.shape({}),
    render: React.PropTypes.func,
    Error: React.PropTypes.func,
    Loader: React.PropTypes.func,
  };

  constructor(props:ProgressiveWebAppProps) {
    super(props);
    Popstate.createPopStateListener();
    State.setState({appConfig: this.props.config});
    State.subscribe(() => this.forceUpdate());
  }

  componentDidMount() {
    loadAssets(location.pathname);
  }

  render() {
    const { AppShell, Loader , Error } = this.props;
    const LoadingComponent = Loader || function NullLoader() { return null; };
    const ErrorComponent = Error || function NullError() { return null; };
    let children;

    // only set children IF this path is registered
    if (State.getState().appConfig[location.pathname]){
      if (State.getState().isLoading) {
        children = <LoadingComponent />;
      } else if (State.getState().error || !window.PWAModule) {
        let error = State.getState().errorValue || {message: 'module wasn\'t loaded'};
        children = <ErrorComponent error={error} />;
      } else {
        children = <window.PWAModule {...State.getState().moduleProps} />;
      }
    }

    return (
      <Router>
        <AppShell>
          {children}
        </AppShell>
      </Router>
    );
  }
}

export const PWALink = (props:Object):RRLink => {
  let onClick: ?Function;

  // if the prop is not registered, we should just use an anchor tag
  if (State.getState().appConfig[props.to] === undefined) {
    return <a href={props.to}>{props.children}</a>;
  }

  if (props.to !== location.pathname) {
    onClick = () => loadAssets(props.to);
  }

  return <RRLink {...props} onClick={onClick}/>;
}
