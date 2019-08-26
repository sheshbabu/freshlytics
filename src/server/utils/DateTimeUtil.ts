import { DateTime } from "luxon";

function getCurrentDateTimeInTimezone(timezone: string) {
  return DateTime.local()
    .setZone(timezone)
    .toFormat("yyyy-MM-dd");
}

export default {
  getCurrentDateTimeInTimezone
};
