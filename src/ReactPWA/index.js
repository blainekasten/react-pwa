import React from 'react';
import Router from 'react-router-dom/BrowserRouter';
import RRLink from 'react-router-dom/Link';
import { loadAssets } from './loader';
import State from './state';

type Config = {
  [url:string]: {
    moduleUrl: string,
    styleUrl: string,
    dataPrefetchUrl: ?string, // fetch the url and pass the results to the component as props
  },
};

// global app config
let appConfig:Config = {};

export class ReactPWA extends React.Component {
  static propTypes = {
    AppShell: React.PropTypes.func,
    config: React.PropTypes.shape({}),
    render: React.PropTypes.func,
  };

  state = State.getState();

  constructor(props, context) {
    super(props, context);
    appConfig = this.props.config;
    State.subscribe(state => this.setState(state));
  }

  componentDidMount() {
    const { moduleUrl, styleUrl } = appConfig[location.pathname];
    loadAssets(moduleUrl, styleUrl);
  }

  render() {
    const { AppShell, loading } = this.props;
    const Loading = loading || function() { return null; };
    let children;

    if (this.state.isLoading) {
      children = <Loading />;
    } else {
      children = <window.PWAModule />
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

export const Link = props => {
  const { moduleUrl, styleUrl } = appConfig[props.to];
  let onClick;

  if (props.to !== location.pathname) {
    onClick = () => loadAssets(moduleUrl, styleUrl)
  }

  return <RRLink {...props} onClick={onClick}/>;
}
