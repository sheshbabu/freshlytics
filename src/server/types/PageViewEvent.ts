export type PageViewEventPayload = {
  projectId: number;
  path: string;
  referrer: string;
  ua: string;
};

export type PageViewEvent = {
  projectId: number;
  path: string;
  referrer: string;
  date: string;
  browserName: string;
  browserNameVersion: string;
};
