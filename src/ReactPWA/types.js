// @flow

export type UrlConfig = {
  moduleUrl: string,
  styleUrl: string,
  dataPrefetchUrl: ?string, // fetch the url and pass the results to the component as props
};

export type AppConfig = {
  [url:string]: UrlConfig,
};

export type Loader = ReactClass<{}>;
export type Error = ReactClass<{error: Object}>;
export type AppShell = ReactClass<{children: Object}>;

export type ProgressiveWebAppProps = {
  AppShell: AppShell,
  Error: Error,
  Loader: Loader,
  config: AppConfig,
  render: ?Function,
};

export type InternalState = {
  isLoading: boolean,
  appConfig: AppConfig,
  error: boolean,
  moduleProps: Object,
};

declare var window: {
  document: {
    body: {
      appendChild: Function,
      removeChild: Function,
    },
  },
};
