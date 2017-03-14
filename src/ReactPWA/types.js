
export type AppConfig = {
  [url:string]: {
    moduleUrl: string,
    styleUrl: string,
    dataPrefetchUrl: ?string, // fetch the url and pass the results to the component as props
  },
};
