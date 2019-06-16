export type PageViewEventPayload = {
  projectId: string;
  path: string;
  referrer: string;
  ua: string;
};

export type PageViewEvent = {
  projectId: string;
  path: string;
  referrer: string;
  date: string;
  browserName: string;
  browserNameVersion: string;
};
