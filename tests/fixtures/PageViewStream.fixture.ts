import format from "date-fns/format";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";
import isEqual from "date-fns/is_equal";
import PageViewStream from "../../src/server/db/models/PageViewStream";

const paths = ["/", "/login", "/signup"];
const referrers = ["", "https://www.google.com", "https://www.duckduckgo.com"];
const browserNames = ["Safari", "Firefox", "Chrome"];
const browserNameVersions = ["Safari-12", "Firefox-67", "Chrome-74"];

const startDate = new Date("2018-12-31");
const endDate = new Date("2020-03-02");

let currDate = startDate;
while (isBefore(currDate, endDate) || isEqual(currDate, endDate)) {
  const eventCount = pickRandomNumber(200, 1000);
  for (let event = 1; event < eventCount; event++) {
    PageViewStream.insert({
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
