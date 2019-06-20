import format from "date-fns/format";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";
import isEqual from "date-fns/is_equal";
import PageViews from "../../src/server/db/models/PageViews";

const paths = [
  "/",
  "/login",
  "/signup",
  "/admin",
  "/admin/settings",
  "/admin/users",
  "/admin/payment",
  "/admin/integrations",
  "/admin/notifications",
  "/repos/web",
  "/repos/web/settings",
  "/repos/web/contributors",
  "/repos/backend",
  "/repos/backend/settings",
  "/repos/backend/contributors",
  "/repos/mobile",
  "/repos/mobile/settings",
  "/repos/mobile/contributors",
  "/repos/docs",
  "/repos/docs/settings",
  "/repos/docs/contributors"
];
const referrers = [
  "",
  "https://www.google.com",
  "https://www.twitter.com",
  "https://www.tumblr.com",
  "https://www.facebook.com",
  "https://www.youtube.com",
  "https://www.reddit.com",
  "https://www.ycombinator.com",
  "https://www.linkedin.com"
];
const browserNames = [
  "Safari",
  "Firefox",
  "Chrome",
  "Vivaldi",
  "Opera",
  "Brave",
  "Edge",
  "Internet Explorer",
  "Netscape",
  "Pale Moon"
];
const browserNameVersions = [
  "Safari 13",
  "Safari 12",
  "Safari 11",
  "Safari 10",
  "Safari 09",
  "Firefox 67",
  "Firefox 66",
  "Firefox 65",
  "Firefox 64",
  "Firefox 63",
  "Firefox 62",
  "Firefox 61",
  "Firefox 60",
  "Chrome 74",
  "Chrome 73",
  "Chrome 72",
  "Chrome 71",
  "Chrome 70",
  "Chrome 69",
  "Chrome 68",
  "Chrome 67"
];

const startDate = new Date("2018-12-31");
const endDate = new Date("2020-03-02");

let currDate = startDate;
while (isBefore(currDate, endDate) || isEqual(currDate, endDate)) {
  const eventCount = pickRandomNumber(200, 1000);
  for (let event = 1; event < eventCount; event++) {
    PageViews.add({
      projectId: "1000",
      date: format(currDate, "YYYY-MM-DD"),
      path: pickRandomItem(paths),
      referrer: pickRandomItem(referrers),
      browserName: pickRandomItem(browserNames),
      browserNameVersion: pickRandomItem(browserNameVersions)
    });
  }
  currDate = addDays(currDate, 1);
}

function pickRandomItem(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
