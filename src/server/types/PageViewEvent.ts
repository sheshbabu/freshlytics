export type PageViewEventPayload = {
  project_id: string;
  path: string;
  referrer: string;
  ua: string;
};

export type PageViewEvent = {
  project_id: string;
  path: string;
  referrer: string;
  date: string;
  browser_name: string;
  browser_name_version: string;
};
